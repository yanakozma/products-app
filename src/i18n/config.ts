import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEn from "./en/translation.json";
import translationUk from "./uk/translation.json";


i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        debug: true,
        resources: {
            en: {translation: translationEn},
            uk: {translation: translationUk},
        },
        interpolation: {
            escapeValue: false
        }

    });

export default i18n;


