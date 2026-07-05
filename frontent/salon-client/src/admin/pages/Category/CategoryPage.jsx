import React, { useState } from 'react'
import {
    Tabs, Tab, Box, Card, CardContent, Typography
} from "@mui/material";
import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';
import CategoryOwnerTable from './CategoryOwnerTable';
import CategoryOtherTable from './CategoryOtherTable';

const CategoryPage = () => {
    const [tab, setTab] = useState(0)

    return (
        <div className="space-y-6">
            <div>
                <Typography variant="h4" className="font-bold text-gray-800">
                    Categories
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                    Manage your service categories
                </Typography>
            </div>

            <Card className="rounded-3xl shadow-lg">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                        <Tab label="All Categories" />
                        <Tab label="All Owner Categories" />
                        <Tab label="Other Categories" />
                        <Tab label="Add Category" />
                    </Tabs>
                </Box>

                <CardContent className="p-6">
                    {tab === 0 && <CategoryTable />}
                    {tab === 1 && <CategoryOwnerTable />}
                    {tab === 2 && <CategoryOtherTable />}
                    {tab === 3 && <CategoryForm />}
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryPage;