import {BrowserRouter, Routes, Route} from "react-router";
import ProductCardWithSearch from "./ProductCardWithSearch.tsx";
import ProductDisplay from "./ProductDisplay.tsx";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import {CssBaseline} from "@mui/material";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <CssBaseline/>
                <LanguageSwitcher/>
                <QueryParamProvider
                    adapter={ReactRouter6Adapter}
                >
                <Routes>
                    <Route path="/" element={<ProductCardWithSearch/>}/>
                    <Route path="/product/:asin" element={<ProductDisplay/>}/>
                </Routes>
                </QueryParamProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
