import React, { useEffect, useState } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    CircularProgress,
    Chip,
    TextField,
    TablePagination,
     InputAdornment
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";

import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../Redux/Category/categorySlice';

const CategoryTable = () => {
    const dispatch = useDispatch();

    const { categories, loadingCategories } = useSelector((store) => store.categories);
    console.log(categories);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const filtered = categories.filter((category)=>
        category?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loadingCategories) {
        return (
            <div className="flex justify-center py-10">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* SEARCH */}
            <TextField
                size="small"
                placeholder="Search category..."
                fullWidth
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                }}
                 InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

          {/* Table */}
            <TableContainer component={Paper}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Salon</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                 <TableBody>
                        {paginated.length > 0 ? (
                            paginated.map((category) => (
                                <TableRow key={category.id} hover>
                                    <TableCell>
                                        <Avatar
                                            src={category.image}
                                            variant="rounded"
                                            sx={{
                                                width: 60,
                                                height: 60,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            {category.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {category.salon?.name || category.salonDto?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {category.salon?.city || category.salonDto?.city || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {category.owner?.fullName || category.user?.fullName || category.userDto?.fullName || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={
                                                category.salon?.active || category.salonDto?.active ? "Active": "Inactive"
                                            }
                                            color={
                                                category.salon?.active || category.salonDto?.active ? "success" : "error"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}align="center">
                                    No Categories Found
                                </TableCell>
                            </TableRow>
                        )}
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
                    setRowsPerPage(parseInt(e.target.value, 10))
                    setPage(0)
                }}
                rowsPerPageOptions={[4, 8, 12]}
            />

        </div>
    )
}

export default CategoryTable