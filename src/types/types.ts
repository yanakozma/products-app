export interface Product {
    img: string;
    asin: string;
    price: number;
    bsr_category: string;
    link: string;
    name: string;
}

export interface ProductApiResponse {
    products: Product[];
}

export interface ProductFormProps {
    search: (productName: string | undefined) => void;
    initialValues: { productName?: string; category: string };
    filterCategory: (category: string) => void;
}

// export interface InitialStateReducer {
//     data: Product[];
//     categories: string[];
//     isLoading: boolean;
//     error: string | null;
// }
