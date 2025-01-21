import ProductCardWithSearch from "./ProductCardWithSearch.tsx";
import {CssBaseline} from "@mui/material";
import Box from "@mui/material/Box";

function App() {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <ProductCardWithSearch/>
        </Box>

    );
}

export default App;
