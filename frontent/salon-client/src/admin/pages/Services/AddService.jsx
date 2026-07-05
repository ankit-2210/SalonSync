import React, { useState } from "react";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Switch,
    FormControlLabel,
    IconButton
} from "@mui/material";
import { Upload } from "lucide-react";

const AddService = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        salonId: "",
        categoryId: "",
        image: null,
        preview: null,
        status: true
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({
                ...form,
                image: file,
                preview: URL.createObjectURL(file)
            });
        }
    };

    const removeImage = () => {
        setForm({ ...form, image: null, preview: null });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-start py-10 px-4">
            <Card className="w-full max-w-4xl rounded-3xl shadow-2xl backdrop-blur-xl bg-white/80">
                <CardContent className="p-10 space-y-8">
                    {/* HEADER */}
                    <div>
                        <Typography variant="h4" className="font-bold text-gray-800">
                            Create New Service
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            Add a premium service to your salon portfolio
                        </Typography>
                    </div>
                    {/* FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField label="Service Name" name="name" fullWidth onChange={handleChange} />
                        <TextField label="Price (₹)" name="price" type="number" fullWidth onChange={handleChange} />
                        <TextField label="Duration (mins)" name="duration" type="number" fullWidth onChange={handleChange} />
                        <TextField label="Salon ID" name="salonId" fullWidth onChange={handleChange} />
                        <TextField label="Category ID" name="categoryId" fullWidth onChange={handleChange} />
                        <div className="md:col-span-2">
                            <TextField
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                fullWidth
                                onChange={handleChange}
                            />
                        </div>
                        {/* IMAGE UPLOAD */}
                        <div className="md:col-span-2">
                            <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
                                <div className="relative inline-block w-full">
                                    {form.preview ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={form.preview}
                                                alt="preview"
                                                className="w-32 h-32 object-cover rounded-xl shadow"
                                            />

                                            <IconButton
                                                size="small"
                                                onClick={removeImage}
                                                className="absolute top-0 right-0 bg-white shadow"
                                            >
                                                ✕
                                            </IconButton>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">
                                                Drag & drop or click to upload
                                            </p>
                                        </>
                                    )}

                                    {/* file input ONLY inside upload box */}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImage}
                                    />

                                </div>
                            </div>
                        </div>
                        {/* STATUS */}
                        <div className="md:col-span-2 flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-700">Service Status</p>
                                <p className="text-sm text-gray-500">Enable or disable this service</p>
                            </div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={form.status}
                                        onChange={() => setForm({ ...form, status: !form.status })}
                                    />
                                }
                                label={form.status ? "Active" : "Inactive"}
                            />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outlined" size="large">
                            Cancel
                        </Button>
                        <Button variant="contained" size="large" className="px-8 py-2">
                            Save Service
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddService;
