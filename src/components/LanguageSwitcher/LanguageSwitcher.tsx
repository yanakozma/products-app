import { useTranslation } from 'react-i18next';
import {Button} from "@/components/ui/button.tsx";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className= "text-end m-2 mr-3" >
            <Button variant="ghost" size="sm" onClick={() => changeLanguage('en')}>English</Button>
            <Button variant="ghost" size="sm" onClick={() => changeLanguage('uk')}>Українська</Button>
        </div>
    );
};

export default LanguageSwitcher;
