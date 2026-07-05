import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Avatar,
    TextField,
    TablePagination
} from "@mui/material";

import { Edit, Delete, Search } from "@mui/icons-material";
import { useState } from "react";

const services = [
    {
        id: 1,
        name: "Hair Cut",
        description: "Professional haircut with styling",
        price: 500,
        duration: 30,
        salonId: 101,
        categoryId: 1,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 2,
        name: "Hair Spa",
        description: "Deep conditioning and nourishment treatment",
        price: 1500,
        duration: 60,
        salonId: 101,
        categoryId: 1,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 3,
        name: "Beard Trim",
        description: "Sharp and clean beard styling",
        price: 300,
        duration: 20,
        salonId: 102,
        categoryId: 1,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 4,
        name: "Facial Glow",
        description: "Skin brightening facial treatment",
        price: 1200,
        duration: 45,
        salonId: 101,
        categoryId: 2,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 5,
        name: "Cleanup",
        description: "Basic skin cleanup and refresh",
        price: 800,
        duration: 40,
        salonId: 103,
        categoryId: 2,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 6,
        name: "Full Body Massage",
        description: "Relaxing full body massage therapy",
        price: 2500,
        duration: 90,
        salonId: 104,
        categoryId: 3,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 7,
        name: "Pedicure",
        description: "Foot care and relaxation treatment",
        price: 700,
        duration: 35,
        salonId: 102,
        categoryId: 4,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 8,
        name: "Manicure",
        description: "Hand care and nail grooming",
        price: 600,
        duration: 30,
        salonId: 102,
        categoryId: 4,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 9,
        name: "Hair Coloring",
        description: "Professional hair coloring service",
        price: 3000,
        duration: 120,
        salonId: 101,
        categoryId: 1,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 10,
        name: "Waxing",
        description: "Full body waxing service",
        price: 1800,
        duration: 60,
        salonId: 103,
        categoryId: 5,
        image: "https://via.placeholder.com/80",
    }
];

const ServiceTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedServices = filteredServices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* HEADER + SEARCH */}
            <div className="p-5 border-b flex justify-between items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Services List
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage all salon services
                    </p>
                </div>
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
            <TableContainer component={Paper} elevation={0}>
                <Table>
                    {/* HEAD */}
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell>Service</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Salon ID</TableCell>
                            <TableCell>Category ID</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* BODY */}
                    <TableBody>
                        {paginatedServices.map((service) => (
                            <TableRow key={service.id} hover className="transition hover:bg-gray-50">
                                {/* SERVICE */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={service.image} variant="rounded" />
                                        <span className="font-medium text-gray-800">
                                            {service.name}
                                        </span>
                                    </div>
                                </TableCell>
                                {/* DESCRIPTION */}
                                <TableCell className="text-gray-500 max-w-[200px] truncate">
                                    {service.description}
                                </TableCell>
                                {/* PRICE */}
                                <TableCell>
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                                        ₹{service.price}
                                    </span>
                                </TableCell>
                                {/* DURATION */}
                                <TableCell>
                                    <Chip
                                        label={`${service.duration} min`}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </TableCell>
                                {/* SALON ID */}
                                <TableCell>{service.salonId}</TableCell>
                                {/* CATEGORY ID */}
                                <TableCell>{service.categoryId}</TableCell>
                                {/* ACTIONS */}
                                <TableCell align="right">
                                    <IconButton color="primary">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton color="error">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PAGINATION */}
            <TablePagination
                component="div"
                count={filteredServices.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default ServiceTable;