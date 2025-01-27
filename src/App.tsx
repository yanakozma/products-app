import {BrowserRouter, Routes, Route} from "react-router";
import ProductCardWithSearch from "./components/ProductCardWithSearch/ProductCardWithSearch.tsx";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay.tsx";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
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
