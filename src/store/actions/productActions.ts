import { Product } from "../../types/types.ts";



export const fetchProductsRequest = () => ({ type: "FETCH_PRODUCTS_REQUEST" });
export const fetchProductsSuccess = (products: Product[], categories: string[]) => ({
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: { products, categories },
});
export const fetchProductsFailure = (error: string) => ({
    type: "FETCH_PRODUCTS_FAILURE",
    payload: error,
});



