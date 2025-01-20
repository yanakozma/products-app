import {Product, ProductApiResponse} from "../types/types.ts";
import {useEffect, useState} from "react";
import ProductSearchForm from "./ProductSearchForm.tsx";


const ProductCardWithSearch = () => {
    const [products, setProducts] = useState<{
        data: Product[];
        isLoading: boolean;
    }>({data: [], isLoading: true});

    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://run.mocky.io/v3/ef9c951a-094d-4f49-8f1a-96ee6c3dfd75");

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`);
                }

                const result: ProductApiResponse = await response.json();
                const allProducts = result.products;

                if (searchQuery) {
                    const searchedProduct = allProducts.filter((product: Product) => {
                        return product.name.toLowerCase().includes(searchQuery);
                    });
                    setProducts({data: searchedProduct, isLoading: false});
                } else {
                    setProducts({data: allProducts, isLoading: false});
                }
            } catch (e) {
                throw new Error(`Something went wrong: ${e}`);
            }
        };
        fetchProducts();

    }, [searchQuery]);

    const search = (productName: string) => {
        setSearchQuery(productName.toLowerCase());
    };

    if (products.isLoading) return <i id="centered">Loading...</i>;


    return (
        <>
            <ProductSearchForm search={search}/>
            <div className='products'>
                {products.data.length > 0 ? (
                    products.data.map((product, index) => (
                        <div key={index} className="productCard">
                            <img src={product.img} alt={product.name}/>
                            <p>{product.name}</p>
                            <p>{product.bsr_category}</p>
                            <p>${product.price}</p>
                            <p><strong>ASIN:</strong> {product.asin}</p>
                            <a href={product.link}> View Product</a>
                        </div>
                    ))) : (
                    <div id="centered">Product not found</div>
                )}
            </div>
        </>

    );
};

export default ProductCardWithSearch;