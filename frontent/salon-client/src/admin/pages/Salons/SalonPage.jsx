import { Typography, Card, Tabs, Tab, CardContent } from '@mui/material';
import React, { useState } from 'react'
import SalonTable from './SalonTable';
import SalonForm from './SalonForm';
import SalonOwners from './SalonOwners';
import SalonOwnersForm from './SalonOwnersForm';

const SalonPage = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className="space-y-6">
            <div>
                <Typography variant="h4" className="font-bold">
                    Salons
                </Typography>
                <Typography className="text-gray-500">
                    Manage your salons
                </Typography>
            </div>
            <Card className="rounded-3xl shadow-lg">
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="All Salons"></Tab>
                    <Tab label="Add Salon"></Tab>
                    <Tab label="Salon Owners"></Tab>
                    <Tab label="Add Owners"></Tab>
                </Tabs>
                <CardContent>
                    {tab === 0 && <SalonTable />}
                    {tab === 1 && <SalonForm />}
                    {tab === 2 && <SalonOwners />}
                    {tab === 3 && <SalonOwnersForm />}
                </CardContent>
            </Card>
        </div>
    )
}

export default SalonPage