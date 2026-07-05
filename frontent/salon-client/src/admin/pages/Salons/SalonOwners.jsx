import React, { useState } from 'react'
import { Typography } from "@mui/material";
import SalonOwnersTable from './SalonOwnersTable';

const SalonOwners = () => {
    return (
        <div className="space-y-6">
            <div>
                <Typography variant="h4" className="font-bold">
                    Salon Owners
                </Typography>
                <Typography className="text-gray-500">
                    Manage all salon owners
                </Typography>
            </div>
            <SalonOwnersTable />
        </div>
    )
}

export default SalonOwners