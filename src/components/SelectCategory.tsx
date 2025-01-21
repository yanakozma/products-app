
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useState} from "react";

export default function SelectCategory({categories, filterCategory}: {
    categories: string[];
    filterCategory: (category: string) => void;
}) {
    const [value, setValue] = useState("");

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value)
        setValue(event.target.value);
        filterCategory(event.target.value);
    };

    return (
        <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={value}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="all">
                        <em>All Categories</em>
                    </MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}