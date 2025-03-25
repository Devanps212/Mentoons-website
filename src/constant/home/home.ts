import { Membership } from "@/types/home/membership";

export const CONSTESTS = [
  {
    title: "Menu Mania",
    image: "/assets/home/contests/menu_mania_contest.png",
    text: "Participate",
  },
  {
    title: "Collect 6 Free Cards",
    image: "/assets/home/contests/free cards Illustration thumbnail.png",
    text: "Download",
  },
  {
    title: "Free Printable Games",
    image: "/assets/home/contests/GAMES FOE WEBSITE.png",
    text: "Download",
  },
  {
    title: "Anchor/Model",
    image: "/assets/home/contests/anchor 2.png",
    text: "Apply",
  },
  {
    title: "Voice Actors",
    image: "/assets/home/contests/Voice actor.png",
    text: "Apply",
  },
  {
    title: "Schools/College",
    image: "/assets/home/contests/College.png",
    text: "Apply",
  },
  {
    title: "Psychologists",
    image: "/assets/home/contests/Psychology 3.png",
    text: "Apply",
  },
  {
    title: "Astrologer",
    image: "/assets/home/contests/Astrologer.png",
    text: "Apply",
  },
];

export const COMMUNITY = [
  {
    title: "Mentoons Mythos",
    description:
      "Mentoons Mythos uses astrology and psychology to help individuals discover their ideal career path.",
    color: "#FAEDCB",
  },
  {
    title: "Mentoring and Collaboration",
    description:
      "Our interactive platform allows parents and children to engage in mentoring relationships, where experienced individuals can guide and support others.",
    color: "#F2C6DE",
  },
  {
    title: "Networking and Friendships",
    description:
      "By joining our platform, parents and children can connect with like-minded individuals, make friends, and build a network of support",
    color: "#C6DEF1",
  },
  {
    title: "Personality Assessment",
    description:
      "Our platform offers personality assessments to help individuals understand traits and make informed decisions.",
    color: "#F2C6DE",
  },
];

export const PRIME: Membership = {
  benefits: [
    {
      feature: "Enable Chat",
      details: "50 Members",
    },
    {
      feature: "Access to groups",
      details: "Unlimited",
    },
    { feature: "Access to freebies", details: "Included" },
    {
      feature: "Free complementary call with a psychologist",
      details: "1 Call",
    },
    {
      feature: "Comics per month",
      details: "4 Comics",
    },
    {
      feature: "Audio Comics per month",
      details: "10 comics",
    },
    {
      feature: "Podcasts per month",
      details: "5 Podcasts",
    },
    {
      feature: "Assessments",
      details: "Available",
    },
    {
      feature: "Workshop Discount",
      details: "Not available",
    },
    {
      feature: "Enable audio calling Feature",
      details: "50 Members",
    },
    {
      feature: "Enable video calling Feature",
      details: "50 Members",
    },
  ],
  price: 129,
  character: "/assets/home/membership/prime.png",
  type: "Prime",
};

export const PLATINUM: Membership = {
  benefits: [
    {
      feature: "Enable Chat",
      details: "Unlimited Members",
    },
    {
      feature: "Access to groups",
      details: "Unlimited",
    },
    { feature: "Access to freebies", details: "Included" },
    {
      feature: "Free complementary call with a psychologist",
      details: "1 Call",
    },
    {
      feature: "Comics per month",
      details: "10 Comics",
    },
    {
      feature: "Audio Comics per month",
      details: "15 comics",
    },
    {
      feature: "Podcasts per month",
      details: "8 Podcasts",
    },
    {
      feature: "Assessments",
      details: "Available",
    },
    {
      feature: "Workshop Discount",
      details: "10% off on 1-year workshop",
    },
    {
      feature: "Enable audio calling Feature",
      details: "Unlimited Members",
      important: true,
    },
    {
      feature: "Enable video calling Feature",
      details: "Unlimited Members",
      important: true,
    },
  ],
  price: 279,
  character: "/assets/home/membership/platinum.png",
  type: "Platinum",
};
