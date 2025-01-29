import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";

export default function MainHeader() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <header
            className={`w-full py-4 px-6 shadow-md fixed top-0 z-50 text-gray-0 ${!isHomePage && "bg-gray-70"}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="text-2xl font-bold">
                    Amazon Products
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="text-lg font-medium hover:text-blue-20 duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/product"
                        className="text-lg font-medium hover:text-blue-20 duration-300"
                    >
                        Products
                    </Link>
                </nav>
                <LanguageSwitcher/>
            </div>
        </header>
    );
}
