import { useState } from "react";
import ProductBanner from "@/components/v3/user/products/productBanner";
import ProductFilters from "@/components/v3/user/products/productFilters";
import ProductSectionsV3 from "@/components/v3/user/products/productsDataV3";
import ShopByCategory, {
  CATEGORY_FILTERS,
  type CategoryFilter,
} from "@/components/v3/user/products/shopByCategory";

const ProductPageV3 = () => {
  const [selectedAgeCategories, setSelectedAgeCategories] = useState<string[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    CATEGORY_FILTERS[0],
  );

  const toggleAge = (age: string) => {
    setSelectedAgeCategories((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age],
    );
  };

  const clearAll = () => {
    setSelectedAgeCategories([]);
    setSelectedCategory(CATEGORY_FILTERS[0]);
  };

  return (
    <div>
      <ProductBanner />
      <div className="px-8">
        <ShopByCategory
          selectedId={selectedCategory.id}
          onSelect={setSelectedCategory}
        />
        <div className="flex items-start gap-5 mt-10">
          <div className="w-1/5 py-10">
            <ProductFilters
              selectedAgeCategories={selectedAgeCategories}
              onToggleAge={toggleAge}
              selectedCategoryId={selectedCategory.id}
              onSelectCategory={setSelectedCategory}
              onClearAll={clearAll}
            />
          </div>
          <div className="flex-1">
            {/* ProductSectionsV3 needs to accept these two props and use
                selectedCategory.productType / selectedCategory.cardType plus
                selectedAgeCategories to filter what it fetches/renders */}
            <ProductSectionsV3
              selectedAgeCategories={selectedAgeCategories}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageV3;
