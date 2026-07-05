import React, { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Switch,
    FormControlLabel
} from "@mui/material";

const SalonOwnersForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        active: true
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            role: "SALON_OWNER",
            active: form.active
        };
        console.log("Salon Owner:", payload);
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl rounded-3xl shadow-xl">
                <CardContent className="space-y-6">
                    {/* HEADER */}
                    <div>
                        <Typography variant="h5" className="font-bold">
                            Add Salon Owner
                        </Typography>
                        <Typography className="text-gray-500 text-sm">
                            Create a new salon owner account
                        </Typography>
                    </div>
                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* NAME + EMAIL */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <TextField
                                label="Full Name"
                                name="name"
                                fullWidth
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                onChange={handleChange}
                            />
                        </div>

                        {/* PHONE */}
                        <TextField
                            label="Phone Number"
                            name="phone"
                            fullWidth
                            onChange={handleChange}
                        />

                        {/* PASSWORD */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                onChange={handleChange}
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                onChange={handleChange}
                            />
                        </div>

                        {/* STATUS */}
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-700">Account Status</p>
                                <p className="text-sm text-gray-500">
                                    Enable or disable this owner
                                </p>
                            </div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={form.active}
                                        onChange={() =>
                                            setForm({ ...form, active: !form.active })
                                        }
                                    />
                                }
                                label={form.active ? "Active" : "Inactive"}
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3">
                            <Button variant="outlined">Cancel</Button>
                            <Button type="submit" variant="contained">
                                Create Owner
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SalonOwnersForm;