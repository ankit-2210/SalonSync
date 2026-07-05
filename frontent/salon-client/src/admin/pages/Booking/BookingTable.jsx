import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, Button, TextField, TablePagination
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Search } from "@mui/icons-material";
import { fetchSalonBookings } from '../../../Redux/Booking/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';

const rows = [
    {
        service: "Hair Cut",
        date: "12 Mar, 10:30 AM",
        price: "₹300",
        customer: {
            name: "Ankit Sharma",
            email: "ankit@gmail.com"
        },
        status: "Booked"
    },
    {
        service: "Facial",
        date: "13 Mar, 2:00 PM",
        price: "₹800",
        customer: {
            name: "Rahul Roy",
            email: "rahul@gmail.com"
        },
        status: "Pending"
    },
]

const getStatusColor = (status) => {
    switch (status) {
        case "Booked":
            return "success"
        case "Pending":
            return "warning"
        case "Cancelled":
            return "error"
        default:
            return "default"
    }
}

const BookingTable = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { bookings, loading } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(fetchSalonBookings());
    }, [dispatch]);

    console.log(bookings);

    const filteredBookings = rows.filter((booking) =>
        booking.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        booking.customer.email.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedBookings = filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* HEADER */}
            <div className="p-5 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Bookings
                </h2>

                <TextField
                    size="small"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: <Search fontSize="small" className="mr-2 text-gray-400" />
                    }}
                />
            </div>
            {/* TABLE */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell>Service</TableCell>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBookings.map((row, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell className="font-medium">
                                    {row.service}
                                </TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                {/* CUSTOMER */}
                                <TableCell>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {row.customer.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {row.customer.email}
                                        </p>
                                    </div>
                                </TableCell>
                                {/* STATUS */}
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={getStatusColor(row.status)}
                                        size="small"
                                    />
                                </TableCell>
                                {/* ACTION */}
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="outlined"
                                    >
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            {/* PAGINATION */}
            <TablePagination
                component="div"
                count={filteredBookings.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    )
}

export default BookingTable