import {useFormik} from "formik";
import * as Yup from "yup";
import {ProductFormProps} from "../types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {Box,Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";



const ProductSearchForm = ({search, initialValues, filterCategory}: ProductFormProps) => {
    const { categories }: {categories: string[]} = useSelector((state: RootState) => state.products);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            productName: Yup.string().min(3, "Minimum 3 symbols is required"),
            category: Yup.string(),
        }),
        onSubmit: (values) => {
            search(values.productName);
        }
    });


    return (
        <>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                    width: 400,
                    height: 57,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
                <TextField
                    fullWidth
                    type="text"
                    name="productName"
                    placeholder="Enter a product name..."
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName}
                    sx={{
                        "& .MuiFormHelperText-root": {
                            position: "absolute",
                            top: "100%",
                            marginTop: "4px",
                        },
                    }}
                />
                <Button variant="outlined" type="submit" sx={{width: "30%", height: "100%"}}>
                    Search
                </Button>
            </Box>
            <Box sx={{ width: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        label="Category"
                        onChange={(e) => {
                            formik.handleChange(e);
                            filterCategory(e.target.value);
                        }}
                    >
                        <MenuItem value="">
                            <em>All Categories</em>
                        </MenuItem>
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default ProductSearchForm;