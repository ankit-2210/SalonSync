import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";

// 🔥 Mock stats
const stats = {
    totalRevenue: 8700,
    totalTransactions: 12,
    pendingAmount: 1200,
    completedPayments: 10
};

// 🔥 Data
const revenueData = [
    { name: "Mon", revenue: 1200 },
    { name: "Tue", revenue: 800 },
    { name: "Wed", revenue: 1500 },
    { name: "Thu", revenue: 900 },
    { name: "Fri", revenue: 2000 },
    { name: "Sat", revenue: 1700 },
    { name: "Sun", revenue: 600 }
];

const monthlyData = [
    { name: "Week 1", revenue: 5000 },
    { name: "Week 2", revenue: 7000 },
    { name: "Week 3", revenue: 6500 },
    { name: "Week 4", revenue: 8000 }
];

const yearlyData = [
    { name: "Jan", revenue: 20000 },
    { name: "Feb", revenue: 25000 },
    { name: "Mar", revenue: 30000 },
    { name: "Apr", revenue: 28000 },
    { name: "May", revenue: 32000 }
];

const Payment = () => {
    const [filter, setFilter] = useState("week");

    // 🔄 Dynamic Data
    const getData = () => {
        if (filter === "month") return monthlyData;
        if (filter === "year") return yearlyData;
        return revenueData;
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <Typography variant="h4" className="font-bold">
                    Payments Overview
                </Typography>
                <Typography className="text-gray-500">
                    Monitor your earnings and transactions
                </Typography>
            </div>

            {/* CARDS */}
            <div className="flex flex-col md:flex-row gap-4">
                <Card className="flex-1 rounded-2xl shadow-sm">
                    <CardContent>
                        <Typography className="text-gray-500 text-sm">
                            Total Revenue
                        </Typography>
                        <Typography variant="h5" className="font-bold text-green-600">
                            ₹{stats.totalRevenue}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="flex-1 rounded-2xl shadow-sm">
                    <CardContent>
                        <Typography className="text-gray-500 text-sm">
                            Transactions
                        </Typography>
                        <Typography variant="h5" className="font-bold">
                            {stats.totalTransactions}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="flex-1 rounded-2xl shadow-sm">
                    <CardContent>
                        <Typography className="text-gray-500 text-sm">
                            Pending
                        </Typography>
                        <Typography variant="h5" className="font-bold text-orange-500">
                            ₹{stats.pendingAmount}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            {/* FILTER BUTTONS */}
            <div className="flex gap-2">
                <Button
                    variant={filter === "week" ? "contained" : "outlined"}
                    onClick={() => setFilter("week")}
                >
                    Week
                </Button>
                <Button
                    variant={filter === "month" ? "contained" : "outlined"}
                    onClick={() => setFilter("month")}
                >
                    Month
                </Button>
                <Button
                    variant={filter === "year" ? "contained" : "outlined"}
                    onClick={() => setFilter("year")}
                >
                    Year
                </Button>
            </div>

            {/* CHART */}
            <Card className="rounded-2xl shadow-sm">
                <CardContent>
                    <Typography className="font-semibold mb-4">
                        Revenue ({filter})
                    </Typography>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer>
                            {/* 🔄 Use Line for week, Bar for others */}
                            {filter === "week" ? (
                                <LineChart data={getData()}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            ) : (
                                <BarChart data={getData()}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" />
                                </BarChart>
                            )}

                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Payment;