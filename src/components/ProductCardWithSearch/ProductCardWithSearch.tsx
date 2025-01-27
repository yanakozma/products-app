import {useState} from "react";
import {Link} from "react-router-dom";
import {useQueryParams, StringParam} from 'use-query-params';
import {Product} from "@/types/types.ts";
import ProductSearchForm from "../ProductSearchForm/ProductSearchForm.tsx";
import {filterProducts} from "@/utils/filterProducts.ts";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {useFetchProductsQuery} from "@/store/productsApi";


const ProductCardWithSearch = () => {
    const { data, isLoading } = useFetchProductsQuery();
    const {t} = useTranslation("translation");

    const [query, setQuery] = useQueryParams({
        search: StringParam,
        category: StringParam,
    });

    const searchQuery = query.search || "";
    const selectedCategory = query.category || "all";

    const filteredProducts = data
        ? filterProducts(data.products, searchQuery, selectedCategory)
        : [];


    const search = (productName: string | undefined) => {
        const trimmedName = productName?.trim();
        setQuery({
            search: trimmedName || undefined,
            category: selectedCategory !== "all" ? selectedCategory : undefined,
        });
    };
    const filterCategory = (category: string) => {
        setQuery({
            search: searchQuery || undefined,
            category: category !== "all" ? category : undefined,
        });
    };

    if (isLoading)
        return (
            <div className="flex min-h-screen items-center justify-center">
            <Button disabled>
                <Loader2 className="animate-spin"/>
                Loading...
            </Button>
            </div>
        );

    return (
        <div className="p-5">
            <ProductSearchForm
                filterCategory={filterCategory}
                search={search}
                initialValues={{
                    productName: searchQuery,
                    category: selectedCategory,
                }}
            />
            <div className="flex flex-wrap gap-10 p-5 mt-12 justify-center">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product}/>
                    ))
                ) : (
                    <div className="text-center m-10 font-medium">{t("error.notFound")}</div>
                )}
            </div>
        </div>
    );
};

const ProductCard = ({product}: { product: Product }) => {
    const {t} = useTranslation("translation");
    const [expanded, setExpanded] = useState(false);
    return (
        <div
            className="w-[300px] mt-1 p-3 flex flex-col justify-between gap-2 border border-gray-500r shadow rounded-md hover:scale-105 hover:shadow-md duration-300 bg-white">
            <div className="h-[250px] w-full flex justify-center items-center">
                <img src={product.img} alt={product.img} className="object-contain h-full max-h-full w-auto"/>
            </div>
            <div className="mt-1 flex flex-col gap-2">
                <p className={`text-lg text-gray-800 font-semibold capitalize ${
                    expanded ? "whitespace-normal" : "text-ellipsis overflow-hidden whitespace-nowrap"
                }`}
                >{product.name.toLowerCase()} </p>
                {product.name.length > 25 && (
                    <Button variant="link" onClick={() => setExpanded(!expanded)}>
                        {expanded ? t("product.readLess") : t("product.readMore")}
                    </Button>
                )}
                <p className="text-sm text-gray-500">{product.bsr_category}</p>
                <p className="text-lg font-medium text-blue-20">${product.price}</p>
                <p className="text-sm">
                    <strong>ASIN:</strong> {product.asin}
                </p>
            </div>
            <Button asChild variant="outline">
                <Link className="font-semibold" to={`/product/${product.asin}`}>
                    {t("product.viewProduct")}
                </Link>
            </Button>
        </div>
    );
};

export default ProductCardWithSearch;

