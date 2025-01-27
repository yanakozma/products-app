
import './index.css';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import './i18n/config.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>,
)
