
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductApiResponse} from "@/types/types.ts";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://run.mocky.io/v3/"
    }),
    endpoints: (build) => ({
        fetchProducts: build.query<{ products: Product[]; categories: string[] }, void>({
            query: () => "ef9c951a-094d-4f49-8f1a-96ee6c3dfd75",
            transformResponse: (response: ProductApiResponse) => {
                const products = response.products;
                const categories = Array.from(new Set(products.map((product) => product.bsr_category)));
                return { products, categories };
            },
        }),
    }),
});

export const { useFetchProductsQuery } = productsApi;
