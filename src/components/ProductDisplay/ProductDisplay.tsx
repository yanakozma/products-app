import {useParams} from "react-router-dom";
import {Product} from "@/types/types.ts";
import {useTranslation} from "react-i18next";
import {AlertCircle} from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button"
import {useFetchProductsQuery} from "@/store/productsApi";


export default function ProductDisplay() {
    const {asin} = useParams<{ asin: string }>();
    const {data, isLoading, error} = useFetchProductsQuery();
    const {t} = useTranslation();


    const product = data?.products.find((p: Product) => p.asin === asin);


    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Button disabled>
                    <Loader2 className="animate-spin"/>
                    Loading...
                </Button>
            </div>
        );

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert variant="destructive" className="max-w-md w-full">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Could not fetch product
                    </AlertDescription>
                </Alert>
            </div>

        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert variant="destructive" className="max-w-md w-full">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>{t("error.notFound")}</AlertTitle>
                    <AlertDescription>
                        {t("error.notFoundSpecificProduct")}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
            <div className="flex-shrink-0 w-full lg:w-1/3">
                <img
                    src={product.img}
                    alt={product.img}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                />
            </div>
            <div className="flex flex-col gap-6 lg:w-2/3">
                <h1 className="text-2xl font-bold">
                    {product.name}
                </h1>

                <p className="text-xl font-semibold text-blue-20">
                    {t("product.price")}: ${product.price}
                </p>

                <div className="flex flex-col gap-2 text-gray-70">
                    <p>
                        <strong>{t("product.brand")}:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </p>
                    <p>
                        <strong>{t("product.color")}:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </p>
                    <p>
                        <strong>{t("product.formFactor")}:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit
                    </p>
                    <p>
                        <strong>ASIN:</strong> {product.asin}
                    </p>
                </div>
                <p className="text-gray-70 leading-relaxed">
                    <strong>{t("product.description")}:</strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur deleniti dolore
                    dolorem, doloremque dolores eligendi iure maiores, obcaecati, placeat quasi quisquam reiciendis
                    repellat saepe tempore. Ex nemo qui quia. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa deserunt id magnam molestiae officia pariatur perferendis quas soluta voluptas! A debitis
                    dolorem eos id illo iusto possimus qui quo reprehenderit. Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Accusantium aliquam asperiores assumenda consequuntur culpa distinctio dolor
                    expedita explicabo, iusto laudantium magni, mollitia officiis quae quos repellendus sapiente sunt
                    tenetur, ut?
                </p>
            </div>
        </div>
    );
}


