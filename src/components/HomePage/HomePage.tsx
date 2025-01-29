import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-[120px] bg-home-page bg-cover bg-center flex flex-col items-center">
            <header className="w-full text-gray-25 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    {t("home.welcome")}
                </h1>
                <p className="text-xl mb-6">
                    {t("home.discover")}
                </p>
                <Button asChild variant="secondary" size="lg">
                    <Link to="/product">{t("home.exploreProducts")}</Link>
                </Button>
            </header>

            <section className="w-full max-w-6xl py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg bg-gray-50">
                    <CardHeader>
                        <CardTitle>{t("home.fastShipping")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t("home.fastShippingDesc")}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg bg-gray-50">
                    <CardHeader>
                        <CardTitle>{t("home.qualityProducts")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t("home.qualityProductsDesc")}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg bg-gray-50">
                    <CardHeader>
                        <CardTitle>{t("home.customerSupport")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t("home.customerSupportDesc")}</p>
                    </CardContent>
                </Card>
            </section>

            <footer className="w-full text-gray-50 py-8 text-center">
                <p>&copy; 2025 Amazon Products. {t("home.allRightsReserved")}</p>
            </footer>
        </div>
    );
}