import {useFormik} from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProductSearchForm = ({search}: { search: (productName: string) => void }) => {
    const formik = useFormik({
        initialValues: {
            productName: "",
        },
        validationSchema: Yup.object({
            productName: Yup.string().min(3, "Minimum 3 symbols is required")
        }),
        onSubmit: (values) => {
            search(values.productName);
        }
    });


    return (
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
    );
};

export default ProductSearchForm;