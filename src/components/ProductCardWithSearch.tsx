import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts} from "../store/actions/productActions";
import {RootState} from "../store/store.ts";
import {Link} from "react-router-dom";
import {useQueryParams, StringParam} from 'use-query-params';
import {Product} from "../types/types.ts";
import ProductSearchForm from "./ProductSearchForm.tsx";
import {filterProducts} from "../utils/filterProducts.ts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const ProductCardWithSearch = () => {
    const dispatch = useDispatch();
    const {data: products, isLoading} = useSelector((state: RootState) => state.products);

    const [query, setQuery] = useQueryParams({
        search: StringParam,
        category: StringParam,
    });

    const searchQuery = query.search || "";
    const selectedCategory = query.category || "";


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = filterProducts(products, searchQuery, selectedCategory);


    const search = (productName: string) => {
        setQuery({
            search: productName || undefined,
            category: selectedCategory || undefined,
        });
    };
    const filterCategory = (category: string) => {
        setQuery({
            search: searchQuery || undefined,
            category: category || undefined,
        });
    };

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


    return (
        <Box sx={{p: 4, width: "100%"}}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 8}}>
                <ProductSearchForm
                    filterCategory={filterCategory}
                    search={search}
                    initialValues={{
                        productName: searchQuery,
                        category: selectedCategory,
                    }}
                />
            </Box>
            <Box sx={{display: "flex", p: 4, gap: 4, flexWrap: "wrap", justifyContent: "center"}}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product}/>
                    ))
                ) : (
                    <Typography align="center" variant="h6" sx={{width: "100%"}}>
                        Product not found
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

const ProductCard = ({product}: { product: Product }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Card
            variant="outlined"
            sx={{
                width: 250,
                maxWidth: "100%",
                mt: 1,
                p: 1,
                gap: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 1,
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={product.img}
                alt={product.name}
                sx={{objectFit: "contain"}}
            />
            <CardContent sx={{p: 2, display: "flex", flexDirection: "column", gap: 1}}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: expanded ? "normal" : "nowrap",
                        textTransform: "capitalize"
                    }}
                >
                    {product.name.toLowerCase()}
                </Typography>
                {product.name.length > 25 && (
                    <Button sx={{color: "gray"}} size="small" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Read Less" : "Read More"}
                    </Button>
                )}
                <Typography color="textSecondary">{product.bsr_category}</Typography>
                <Typography variant="body1" color="red" sx={{fontWeight: "bold"}}>
                    ${product.price}
                </Typography>
                <Typography variant="body2">
                    <strong>ASIN:</strong> {product.asin}
                </Typography>
            </CardContent>
            <Button
                component={Link}
                to={`/product/${product.asin}`}
                size="small"
                sx={{m: 1, color: "gray", fontWeight: "bold"}}
            >
                View Product
            </Button>
        </Card>
    );
};

export default ProductCardWithSearch;


