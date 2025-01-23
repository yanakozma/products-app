import {InitialStateReducer} from "../../types/types.ts";

const initialState: InitialStateReducer = {
    data: [],
    categories: [],
    isLoading: false,
    error: null,
};


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS_REQUEST":
            return { ...state, isLoading: true, error: null };
        case "FETCH_PRODUCTS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                data: action.payload.products,
                categories: action.payload.categories,
            };
        case "FETCH_PRODUCTS_FAILURE":
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
