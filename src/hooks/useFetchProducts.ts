import { useState, useEffect } from "react";
import { Product, ProductApiResponse, ProductState } from "../types/types.ts";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductState>({ data: [], isLoading: true });
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://run.mocky.io/v3/ef9c951a-094d-4f49-8f1a-96ee6c3dfd75");
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`);
                }
                const result: ProductApiResponse = await response.json();
                const allProducts = result.products;
                setProducts({ data: allProducts, isLoading: false });

                const uniqueCategories = Array.from(
                    new Set(allProducts.map((product: Product) => product.bsr_category))
                );
                setCategories(uniqueCategories);
                console.log("fetch data runs")
            } catch (e) {
                console.error(`Error fetching products: ${e}`);
            }
        };

        fetchProducts();
    }, []);

    return { products, categories };
};
