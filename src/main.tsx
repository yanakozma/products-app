import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './components/App.tsx'
import {Provider} from "react-redux";
import store from "./store/store.ts";
import './i18n/config.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>,
)
