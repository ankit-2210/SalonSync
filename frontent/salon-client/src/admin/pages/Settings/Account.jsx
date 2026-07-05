import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    Tabs,
    Tab,
    Switch,
    FormControlLabel,
    Grid
} from "@mui/material";

const Account = () => {
    const [tab, setTab] = useState(0);

    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        role: "Admin",
        salonName: "Urban Salon",
        address: "Kolkata, India"
    });

    const [password, setPassword] = useState({
        current: "",
        newPass: "",
        confirm: ""
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* HEADER */}
                <Card className="rounded-3xl shadow-lg">
                    <CardContent>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <Avatar sx={{ width: 80, height: 80 }} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" className="font-bold">
                                    {profile.name}
                                </Typography>
                                <Typography className="text-gray-500">
                                    {profile.email}
                                </Typography>
                                <Typography className="text-sm text-blue-600">
                                    {profile.role}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>


                {/* TABS */}
                <Card className="rounded-3xl shadow-md">
                    <Tabs
                        value={tab}
                        onChange={(e, v) => setTab(v)}
                        indicatorColor="primary">
                        <Tab label="Profile" />
                        <Tab label="Security" />
                        <Tab label="Settings" />
                    </Tabs>
                    <CardContent className="p-6">
                        {/* PROFILE TAB */}
                        {tab === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField
                                    label="Full Name"
                                    value={profile.name}
                                    onChange={(e) =>
                                        setProfile({ ...profile, name: e.target.value })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    value={profile.email}
                                    fullWidth
                                />
                                <TextField
                                    label="Phone"
                                    value={profile.phone}
                                    onChange={(e) =>
                                        setProfile({ ...profile, phone: e.target.value })
                                    }
                                    fullWidth
                                />
                                <TextField
                                    label="Salon Name"
                                    value={profile.salonName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, salonName: e.target.value })
                                    }
                                    fullWidth
                                />
                                <div className="md:col-span-2">
                                    <TextField
                                        label="Address"
                                        value={profile.address}
                                        onChange={(e) =>
                                            setProfile({ ...profile, address: e.target.value })
                                        }
                                        fullWidth
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <Button variant="contained">Save Changes</Button>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {tab === 1 && (
                            <div className="space-y-5 max-w-md">
                                <TextField
                                    label="Current Password"
                                    type="password"
                                    fullWidth
                                    value={password.current}
                                    onChange={(e) =>
                                        setPassword({ ...password, current: e.target.value })
                                    }
                                />
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    value={password.newPass}
                                    onChange={(e) =>
                                        setPassword({ ...password, newPass: e.target.value })
                                    }
                                />
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    value={password.confirm}
                                    onChange={(e) =>
                                        setPassword({ ...password, confirm: e.target.value })
                                    }
                                />
                                <Button variant="contained">Update Password</Button>
                            </div>
                        )}

                        {/* SETTINGS TAB */}
                        {tab === 2 && (
                            <div className="space-y-4">
                                <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                                <FormControlLabel control={<Switch />} label="SMS Notifications" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Two Factor Authentication" />
                                <Button color="error" variant="outlined">Logout</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Account;