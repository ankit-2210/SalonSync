import React from 'react'
import BookingTable from './BookingTable'
import { Button } from '@mui/material'

const BookingsPage = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Bookings</h1>
                    <p className="text-sm text-gray-500">Manage your services</p>
                </div>
                <Button variant="contained">+ Add Booking</Button>
            </div>
            <BookingTable />
        </div>
    )

}

export default BookingsPage