import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    MenuItem
} from "@mui/material";
import { toast } from 'react-toastify';
import { CloudUpload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../Redux/Category/categorySlice";
import { fetchSalonByOwnerId } from "../../../Redux/Salon/salonSlice";

const CategoryForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [preview, setPreview] = useState(null)

    const { salons, loading } = useSelector((store) => store.salon);
    console.log(salons);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        salonId: "",
    });

    useEffect(() => {
        dispatch(fetchSalonByOwnerId());
    }, [dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file));

            setFormData({
                ...formData,
                image: URL.createObjectURL(file)
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(createCategory(formData));
        if (createCategory.fulfilled.match(result)) {
            toast.success(
                result.payload.message ||
                "Category created successfully"
            );

            setFormData({
                name: "",
                image: "",
                salonId: ""
            });

            setPreview(null);
        }
        if (createCategory.rejected.match(result)) {
            toast.error(
                result.payload ||
                "Failed to create category"
            );
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="max-w-xl">
            <Card className="rounded-2xl shadow-md">
                <CardContent className="space-y-6">

                    <Typography variant="h6" className="font-semibold">
                        Add New Category
                    </Typography>

                    {/* Category Name */}
                    <TextField
                        label="Category Name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                    />

                    {/* Salon Dropdown */}
                    <TextField
                        select
                        fullWidth
                        label="Select Salon"
                        name="salonId"
                        value={formData.salonId}
                        onChange={handleChange}
                        margin="normal"
                    >
                        {
                            salons?.map((salon) => (
                                <MenuItem key={salon.id} value={salon.id}>
                                    {salon.name} ({salon.city})
                                </MenuItem>
                            ))
                        }
                    </TextField>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed rounded-xl p-6 text-center relative cursor-pointer">
                        {preview ? (
                            <img src={preview} className="w-24 h-24 mx-auto rounded" />
                        ) : (
                            <>
                                <CloudUpload className="mx-auto mb-2" />
                                <Typography variant="body2">Upload Image</Typography>
                            </>
                        )}

                        <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0" />
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <CircularProgress size={20} />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryForm