import {ProductFormProps} from "@/types/types.ts";
import {useTranslation} from "react-i18next";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {
    Form,
    FormItem,
    FormControl,
    FormMessage,
    FormField,
} from "@/components/ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import {useFetchProductsQuery} from "@/store/productsApi";
import { Search } from "lucide-react";



const formSchema = z.object({
    productName: z
        .string()
        .optional()
        .refine((val) => !val || val.trim().length >= 3, {
            message: "Minimum 3 symbols is required",
        }),
    category: z.string(),
})


const ProductSearchForm = ({search, initialValues, filterCategory}: ProductFormProps) => {
    const { data } = useFetchProductsQuery();
    const {t} = useTranslation();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        search(values.productName);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-20 h-[52px]">
                <div className="flex items-center gap-2 h-full">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({field}) => (
                            <FormItem className="h-full">
                                <FormControl>
                                    <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder={t("form.enterProductName")}
                                        className="w-[400px] h-[52px] pl-10"
                                        />
                                    <button className="absolute left-2.5 top-[30%]" type="button">
                                        <Search/>
                                    </button>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button variant="primary" className="h-full w-32" type="submit">{t("form.search")}</Button>
                </div>
                <FormField
                    control={form.control}
                    name="category"
                    render={({field}) => (
                        <FormItem className="w-[500px] h-full">
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    filterCategory(value);
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="h-full">
                                        <SelectValue placeholder={t("form.selectCategory")}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="all">Select all</SelectItem>
                                    {data?.categories.map((category, index) => (
                                        <SelectItem key={index} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default ProductSearchForm;