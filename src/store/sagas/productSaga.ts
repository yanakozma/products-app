import { call, put, takeLatest } from "redux-saga/effects";
import { fetchProductsSuccess, fetchProductsFailure } from "../actions/productActions";
import { ProductApiResponse, Product } from "../../types/types";

function* fetchProductsSaga() {
    try {
        const response: Response = yield call(fetch, "https://run.mocky.io/v3/ef9c951a-094d-4f49-8f1a-96ee6c3dfd75");
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const result: ProductApiResponse = yield response.json();
        const products: Product[] = result.products;
        const categories: string[] = Array.from(new Set(products.map((product) => product.bsr_category)));
        yield put(fetchProductsSuccess(products, categories));
    } catch (error: any) {
        yield put(fetchProductsFailure(error.message));
    }
}

export function* watchFetchProducts() {
    yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProductsSaga);
}
