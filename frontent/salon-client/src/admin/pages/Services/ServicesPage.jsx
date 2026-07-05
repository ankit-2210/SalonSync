import React from 'react'
import { Button } from '@mui/material'
import ServiceTable from './ServiceTable'

const ServicesPage = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Services</h1>
                    <p className="text-sm text-gray-500">Manage your services</p>
                </div>
                <Button variant="contained">+ Add Service</Button>
            </div>
            <ServiceTable />
        </div>
    )
}

export default ServicesPage