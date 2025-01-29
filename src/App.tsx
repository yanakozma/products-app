import {BrowserRouter, Routes, Route} from "react-router";
import ProductCardWithSearch from "./components/ProductCardWithSearch/ProductCardWithSearch.tsx";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay.tsx";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import HomePage from "@/components/HomePage/HomePage.tsx";
import MainHeader from "./components/MainHeader/MainHeader.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <MainHeader />
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductCardWithSearch />} />
                    <Route path="/product/:asin" element={<ProductDisplay />} />
                </Routes>
                </QueryParamProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
