import React, { useState } from "react";

const ProductSearchForm = ({search}: {search: (productName: string) => void}) => {
    const [term, setTerm] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        search(term);
        setTerm("");
    };

    return (
        <form onSubmit={handleSubmit} className="productSearchForm">
            <input
                type="text"
                placeholder="Enter a product name..."
                value={term}
                onChange={handleChange}
            />
            <button>Search</button>
        </form>
    );
};

export default ProductSearchForm;