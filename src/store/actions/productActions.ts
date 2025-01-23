import { Dispatch } from "redux";
import { Product, ProductApiResponse } from "../../types/types.ts";



export const fetchProductsRequest = () => ({ type: "FETCH_PRODUCTS_REQUEST" });
export const fetchProductsSuccess = (products: Product[], categories: string[]) => ({
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: { products, categories },
});
export const fetchProductsFailure = (error: string) => ({
    type: "FETCH_PRODUCTS_FAILURE",
    payload: error,
});

export const fetchProducts = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch("https://run.mocky.io/v3/ef9c951a-094d-4f49-8f1a-96ee6c3dfd75");
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }
            const result: ProductApiResponse = await response.json();
            const products = result.products;
            const categories = Array.from(new Set(products.map((product: Product) => product.bsr_category)));
            dispatch(fetchProductsSuccess(products, categories));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};
