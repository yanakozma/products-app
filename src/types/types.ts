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