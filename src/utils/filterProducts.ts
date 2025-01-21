import { Product } from "../types/types";

export const filterProducts = (products: Product[], searchQuery: string, selectedCategory: string): Product[] => {
    let filtered = [...products];

    if (searchQuery) {
        filtered = filtered.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (selectedCategory && selectedCategory !== "all") {
        filtered = filtered.filter((product) => product.bsr_category === selectedCategory);
    }

    return filtered;
};