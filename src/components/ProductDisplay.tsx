import {useParams} from "react-router-dom";
import {Product} from "../types/types.ts";
import {useEffect} from "react";
import {fetchProducts} from "../store/actions/productActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import {Alert, AlertTitle} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


export default function ProductDisplay() {
    const {asin} = useParams<{ asin: string }>();
    const dispatch = useDispatch();
    const {data: products, isLoading, error} = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const product = products.find((p: Product) => p.asin === asin);

    if (isLoading)
        return (
            <Typography
                align="center"
                variant="h6"
                sx={{width: "100%", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                Loading...
            </Typography>
        );

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <Alert
                    severity="error"
                    icon={<ErrorOutlineIcon />}
                    sx={{
                        maxWidth: 600,
                        width: "100%",
                        boxShadow: 3,
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        bgcolor: "#f8d7da",
                        color: "#721c24",
                    }}
                >
                    <AlertTitle>Error</AlertTitle>
                    {error || "An unexpected error occurred. Please try again later."}
                </Alert>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <Alert
                    severity="error"
                    icon={<ErrorOutlineIcon />}
                    sx={{
                        maxWidth: 600,
                        width: "100%",
                        boxShadow: 3,
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        bgcolor: "#f8d7da",
                        color: "#721c24",
                    }}
                >
                    <AlertTitle>Product Not Found</AlertTitle>
                    We couldn't find the product you are looking for. Please check the URL or try again later.
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 4,
                p: 4,
            }}
        >
            <CardMedia
                component="img"
                image={product.img}
                alt={product.name}
                sx={{
                    width: 400,
                    height: 400,
                    objectFit: "contain",
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            />
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Typography variant="h5" component="div" gutterBottom>
                    {product.name}
                </Typography>

                <Typography variant="h6" color="primary">
                    Price: ${product.price}
                </Typography>

                <Box>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Brand:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Color:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Form Factor:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>ASIN:</strong> {product.asin}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    <strong>About this item:</strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur deleniti dolore
                    dolorem, doloremque dolores eligendi iure maiores, obcaecati, placeat quasi quisquam reiciendis
                    repellat saepe tempore. Ex nemo qui quia. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa deserunt id magnam molestiae officia pariatur perferendis quas soluta voluptas! A debitis
                    dolorem eos id illo iusto possimus qui quo reprehenderit. Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Accusantium aliquam asperiores assumenda consequuntur culpa distinctio dolor
                    expedita explicabo, iusto laudantium magni, mollitia officiis quae quos repellendus sapiente sunt
                    tenetur, ut?
                </Typography>
            </Box>
        </Box>
    );
}
