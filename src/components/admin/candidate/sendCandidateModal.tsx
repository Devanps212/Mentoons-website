import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  List,
  Paperclip,
  Send,
  Underline,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Link2,
} from "lucide-react";
import { api } from "@/api/axiosInstance/axiosInstance";

export interface EmailRecipient {
  id: string;
  name: string;
  email: string;
}

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: EmailRecipient[];
  onSent?: () => void;
}

type ModalStatus = "idle" | "sending" | "success" | "error";

const MAX_VISIBLE_RECIPIENTS = 5;
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = [
  "image/",
  "video/",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const isAllowedFile = (file: File) =>
  ALLOWED_ATTACHMENT_TYPES.some((prefix) => file.type.startsWith(prefix));

const hasImageAttachment = (files: File[]) =>
  files.some((file) => file.type.startsWith("image/"));

const buildDefaultBody = (recipients: EmailRecipient[]) => {
  const greeting =
    recipients.length === 1
      ? `Dear ${recipients[0]?.name?.split(" ")[0] || ""}`
      : "Dear Candidate";
  return `<p>${greeting},</p><p><br></p><p><br></p><p>Best regards,<br>Mentoons</p>`;
};

const SendEmailModal = ({
  isOpen,
  onClose,
  recipients,
  onSent,
}: SendEmailModalProps) => {
  const [extraEmails, setExtraEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [showAllRecipients, setShowAllRecipients] = useState(false);
  const [subject, setSubject] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [linkUrl, setLinkUrl] = useState("");
  const [linkUrlError, setLinkUrlError] = useState("");

  const [status, setStatus] = useState<ModalStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasInitializedBody = useRef(false);

  if (isOpen && !hasInitializedBody.current && editorRef.current) {
    editorRef.current.innerHTML = buildDefaultBody(recipients);
    hasInitializedBody.current = true;
  }
  if (!isOpen && hasInitializedBody.current) {
    hasInitializedBody.current = false;
  }

  const allRecipients = [
    ...recipients,
    ...extraEmails.map((email) => ({ id: email, name: email, email })),
  ];
  const visibleRecipients = showAllRecipients
    ? allRecipients
    : allRecipients.slice(0, MAX_VISIBLE_RECIPIENTS);
  const hiddenCount = allRecipients.length - visibleRecipients.length;

  const canSend = allRecipients.length > 0 && status !== "sending";
  const showLinkField = hasImageAttachment(attachments);

  const syncActiveFormats = () => {
    const next = new Set<string>();
    if (document.queryCommandState("bold")) next.add("bold");
    if (document.queryCommandState("italic")) next.add("italic");
    if (document.queryCommandState("underline")) next.add("underline");
    if (document.queryCommandState("insertUnorderedList")) next.add("list");
    setActiveFormats(next);
  };

  const applyFormat = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    syncActiveFormats();
  };

  const handleAddEmail = () => {
    const email = emailInput.trim();
    if (!email) return;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) return;
    if (
      recipients.some((r) => r.email === email) ||
      extraEmails.includes(email)
    ) {
      setEmailInput("");
      return;
    }
    setExtraEmails((prev) => [...prev, email]);
    setEmailInput("");
  };

  const handleEmailInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const removeExtraEmail = (email: string) => {
    setExtraEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const valid: File[] = [];
    let rejected = false;

    for (const file of files) {
      if (!isAllowedFile(file)) {
        rejected = true;
        continue;
      }
      if (file.size > MAX_ATTACHMENT_SIZE) {
        rejected = true;
        continue;
      }
      valid.push(file);
    }

    setAttachmentError(
      rejected
        ? "Some files were skipped — only images, videos, PDF, and Word files under 5MB are allowed."
        : "",
    );
    setAttachments((prev) => [...prev, ...valid]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (!hasImageAttachment(next)) {
        setLinkUrl("");
        setLinkUrlError("");
      }
      return next;
    });
  };

  const validateLinkUrl = (value: string) => {
    if (!value.trim()) {
      setLinkUrlError("");
      return true;
    }
    try {
      // eslint-disable-next-line no-new
      new URL(value.trim());
      setLinkUrlError("");
      return true;
    } catch {
      setLinkUrlError("Enter a valid URL, e.g. https://example.com/page");
      return false;
    }
  };

  const resetState = () => {
    setExtraEmails([]);
    setEmailInput("");
    setShowAllRecipients(false);
    setSubject("");
    setAttachments([]);
    setAttachmentError("");
    setLinkUrl("");
    setLinkUrlError("");
    setStatus("idle");
    setErrorMessage("");
    hasInitializedBody.current = false;
  };

  const handleClose = () => {
    if (status === "sending") return;
    resetState();
    onClose();
  };

  const handleSend = async () => {
    if (!canSend) return;
    if (linkUrl.trim() && !validateLinkUrl(linkUrl)) return;
    setStatus("sending");

    try {
      const formData = new FormData();
      allRecipients.forEach((r) => formData.append("to[]", r.email));
      formData.append("subject", subject);
      formData.append("body", editorRef.current?.innerHTML ?? "");
      if (linkUrl.trim()) {
        formData.append("linkUrl", linkUrl.trim());
      }
      attachments.forEach((file) => formData.append("attachments", file));

      await api.post("/candidate/send-email", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      onSent?.();
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.response?.data?.message || "Failed to send email");
    }
  };

  const toolbarBtnClass = (key: string) =>
    `p-1.5 rounded-md transition-colors ${
      activeFormats.has(key)
        ? "bg-yellow-100 text-yellow-700"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999] p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-xl p-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Send className="w-5 h-5 text-yellow-500" />
            <h1 className="text-lg font-semibold text-gray-900">
              Send Email
              {recipients.length > 1 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({allRecipients.length} recipient
                  {allRecipients.length !== 1 ? "s" : ""})
                </span>
              )}
            </h1>
          </div>
          <button
            onClick={handleClose}
            disabled={status === "sending"}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <hr className="w-full border-gray-200 mt-4" />

        {status === "idle" && (
          <>
            <div className="flex flex-col gap-1 mt-4">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="flex flex-wrap gap-1.5 p-2 rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400">
                {visibleRecipients.map((r) => (
                  <span
                    key={r.id}
                    className="flex items-center gap-1.5 bg-gray-100 rounded-full pl-2.5 pr-1 py-1 text-xs text-gray-700"
                  >
                    <span className="max-w-[180px] truncate">
                      {r.name !== r.email ? `${r.name} <${r.email}>` : r.email}
                    </span>
                    {extraEmails.includes(r.email) && (
                      <button
                        type="button"
                        onClick={() => removeExtraEmail(r.email)}
                        className="p-0.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                        aria-label={`Remove ${r.email}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}

                {hiddenCount > 0 && !showAllRecipients && (
                  <button
                    type="button"
                    onClick={() => setShowAllRecipients(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                  >
                    +{hiddenCount} more <ChevronDown className="w-3 h-3" />
                  </button>
                )}
                {showAllRecipients &&
                  allRecipients.length > MAX_VISIBLE_RECIPIENTS && (
                    <button
                      type="button"
                      onClick={() => setShowAllRecipients(false)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200"
                    >
                      Show less <ChevronUp className="w-3 h-3" />
                    </button>
                  )}

                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={handleEmailInputKeyDown}
                  onBlur={handleAddEmail}
                  placeholder={
                    allRecipients.length === 0
                      ? "Enter email and press Enter"
                      : "Add another..."
                  }
                  className="flex-1 min-w-[140px] text-sm outline-none py-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <label
                htmlFor="email-subject"
                className="text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                id="email-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className="p-2 rounded-md border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            <div className="rounded-lg border border-gray-300 overflow-hidden mt-4 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400">
              <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className={toolbarBtnClass("bold")}
                  aria-label="Bold"
                  aria-pressed={activeFormats.has("bold")}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className={toolbarBtnClass("italic")}
                  aria-label="Italic"
                  aria-pressed={activeFormats.has("italic")}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("underline")}
                  className={toolbarBtnClass("underline")}
                  aria-label="Underline"
                  aria-pressed={activeFormats.has("underline")}
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertUnorderedList")}
                  className={toolbarBtnClass("list")}
                  aria-label="Bullet list"
                  aria-pressed={activeFormats.has("list")}
                >
                  <List className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={handleAttachClick}
                  className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFilesSelected}
                  className="hidden"
                />
              </div>

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onKeyUp={syncActiveFormats}
                onMouseUp={syncActiveFormats}
                data-placeholder="Write your message..."
                className="w-full min-h-[180px] outline-none p-3 text-sm empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              />

              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border-t border-gray-200 bg-gray-50">
                  {attachments.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-2 bg-white border border-gray-300 rounded-full pl-3 pr-1 py-1 text-xs text-gray-700"
                    >
                      <span className="max-w-[140px] truncate">
                        {file.name}
                      </span>
                      <span className="text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(1)}MB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="p-0.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {attachmentError && (
              <p className="text-xs text-red-500 mt-2">{attachmentError}</p>
            )}

            {showLinkField && (
              <div className="flex flex-col gap-1 mt-3">
                <label
                  htmlFor="image-link-url"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                >
                  <Link2 className="w-3.5 h-3.5 text-gray-500" />
                  Link for attached images (optional)
                </label>
                <input
                  id="image-link-url"
                  type="url"
                  value={linkUrl}
                  onChange={(e) => {
                    setLinkUrl(e.target.value);
                    if (linkUrlError) validateLinkUrl(e.target.value);
                  }}
                  onBlur={(e) => validateLinkUrl(e.target.value)}
                  placeholder="https://yourdomain.com/page"
                  className={`p-2 rounded-md border text-sm outline-none focus:ring-2 ${
                    linkUrlError
                      ? "border-red-300 focus:ring-red-300 focus:border-red-400"
                      : "border-gray-300 focus:ring-yellow-400 focus:border-yellow-400"
                  }`}
                />
                {linkUrlError ? (
                  <p className="text-xs text-red-500">{linkUrlError}</p>
                ) : (
                  <p className="text-xs text-gray-400">
                    Every attached image will be wrapped with this link —
                    tapping the image in the email opens this page.
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-md font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend || !!linkUrlError}
                className="px-5 py-2 rounded-md font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </>
        )}

        {status === "sending" && (
          <div className="flex flex-col items-center py-10">
            <Loader2 size={40} className="text-yellow-500 animate-spin mb-4" />
            <p className="text-sm text-gray-600">
              Sending to {allRecipients.length} recipient
              {allRecipients.length !== 1 ? "s" : ""}...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-10">
            <p className="text-sm font-semibold text-gray-700">
              Email sent successfully!
            </p>
            <button
              onClick={handleClose}
              className="mt-5 px-5 py-2 text-sm rounded-md bg-gray-900 text-white font-semibold"
            >
              Close
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-10">
            <p className="text-sm font-semibold text-gray-700">
              {errorMessage}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setStatus("idle")}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Try Again
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendEmailModal;
