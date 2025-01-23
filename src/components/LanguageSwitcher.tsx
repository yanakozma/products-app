import { useTranslation } from 'react-i18next';
import {Box, Button} from '@mui/material';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        console.log('Active Language:', i18n.language);

    };

    return (
        <Box sx={{ m: 2, mr: 7, textAlign: 'end' }}>
            <Button onClick={() => changeLanguage('en')}>English</Button>
            <Button onClick={() => changeLanguage('uk')}>Українська</Button>
        </Box>
    );
};

export default LanguageSwitcher;
