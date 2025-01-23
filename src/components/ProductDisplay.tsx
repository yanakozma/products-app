import {useParams} from "react-router-dom";
import {Product} from "../types/types.ts";
import {useEffect} from "react";
import {fetchProducts} from "../store/actions/productActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";



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
            <Typography align="center" variant="h6" color="error">
                {error}
            </Typography>
        );
    }

    if (!product) {
        return (
            <Typography align="center" variant="h6" color="error">
                Product not found
            </Typography>
        );
    }


    return (
        <Box sx={{display: "flex", justifyContent: "center", p: 4}}>
            <Card sx={{maxWidth: 600, width: "100%", boxShadow: 3}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.img}
                    alt={product.name}
                    sx={{objectFit: "contain"}}
                />
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Category: {product.bsr_category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>ASIN:</strong> {product.asin}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
};
