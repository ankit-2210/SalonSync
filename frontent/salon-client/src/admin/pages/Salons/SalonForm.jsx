import React, { useState } from "react";
import {
    Card, CardContent, TextField, Button, Typography,
    Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createSalon } from "../../../Redux/Salon/salonSlice";

const SalonForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    const [form, setForm] = useState({
        name: "",
        images: [""],
        address: "",
        city: "",
        phoneNumber: "",
        email: "",
        openTime: "",
        closeTime: "",
    });



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({
            ...form,
            images: [e.target.value],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.address || !form.city || !form.phoneNumber ||
            !form.email || !form.openTime || !form.closeTime) {
            Swal.fire({
                title: "Missing Fields",
                text: "Please fill all required fields",
                icon: "warning",
            });
            return;
        }

        const result = await Swal.fire({
            title: "Create Salon?",
            text: "Do you want to save this salon?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Save",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            const response = await dispatch(
                createSalon({
                    salonDetails: form,
                    navigate,
                })
            );
            if (createSalon.fulfilled.match(response)) {
                Swal.fire({
                    title: "Success!",
                    text: "Salon created successfully 🎉",
                    icon: "success",
                });
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: response.payload || "Something went wrong",
                    icon: "error",
                });
            }
        }
    };

    return (
        <Card className="rounded-2xl shadow-md">
            <CardContent className="space-y-6">
                <Typography variant="h6">
                    Add New Salon
                </Typography>
                <Typography variant="body1">
                    Owner: {user?.fullName || "Current User"}
                </Typography>
                <div className="flex flex-col md:flex-row gap-4">
                    <TextField label="Salon Name" name="name" value={form.name} fullWidth onChange={handleChange} />
                    <TextField label="City" name="city" value={form.city} fullWidth onChange={handleChange} />
                </div>
                <TextField label="Salon Image URL" fullWidth value={form.images[0]} onChange={handleImageChange} />
                <TextField label="Address" name="address" value={form.address} fullWidth onChange={handleChange} />
                <div className="flex flex-col md:flex-row gap-4">
                    <TextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} fullWidth onChange={handleChange} />
                    <TextField label="Email" name="email" value={form.email} fullWidth onChange={handleChange} />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <TextField type="time" label="Open Time" name="openTime" fullWidth value={form.openTime} InputLabelProps={{ shrink: true }} onChange={handleChange} />
                    <TextField type="time" label="Close Time" name="closeTime" fullWidth value={form.closeTime} InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </div>
                <div className="flex justify-end">
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        Save Salon
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalonForm;