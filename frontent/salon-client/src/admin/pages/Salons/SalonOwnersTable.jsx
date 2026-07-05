import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton,
    Avatar, TextField, TablePagination, Chip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Delete, Search } from "@mui/icons-material";
import { fetchSalonOwners } from "../../../Redux/Salon/salonSlice";

const SalonOwnersTable = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { owners, loading } = useSelector((state) => state.salon);
    useEffect(() => {
        dispatch(fetchSalonOwners());
    }, [dispatch]);

    console.log(owners);

    const filtered = owners.filter((o) =>
        o.fullName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* HEADER + SEARCH */}
            <div className="p-5 border-b flex justify-between items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Owners List
                    </h2>
                    <p className="text-sm text-gray-500">
                        All registered salon owners
                    </p>
                </div>
                <TextField
                    size="small"
                    placeholder="Search owner..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                    InputProps={{
                        startAdornment: (
                            <Search fontSize="small" className="mr-2 text-gray-400" />
                        )
                    }}
                />
            </div>
            {/* TABLE */}
            <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell>Owner</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map((o) => (
                            <TableRow key={o.id} hover>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            {o.fullName.charAt(0)}
                                        </Avatar>
                                        <span className="font-medium text-gray-800">
                                            {o.fullName}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{o.email}</TableCell>
                                <TableCell>{o.phone}</TableCell>
                                <TableCell>
                                    <Chip
                                        label="Salon Owner"
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="error">
                                        <Delete />
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
                count={filtered.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[3, 5, 10]}
            />
        </div>
    );
}

export default SalonOwnersTable