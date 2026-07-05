import React, { useEffect, useState } from "react";
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
    TextField,
    TablePagination,
    InputAdornment,
    Chip,
    Box
} from "@mui/material";

import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getOthersCategories } from "../../../Redux/Category/categorySlice";

const CategoryOtherTable = () => {
    const dispatch = useDispatch();

    const { othersCategories = [], loadingCategories } = useSelector((store) => store.categories);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getOthersCategories());
    }, [dispatch]);

    const filtered = othersCategories.filter((category) =>
        category?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loadingCategories) {
        return (
            <Box className="flex justify-center items-center py-10">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="space-y-5">

            {/* Header */}
            <div>
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Other Salon Categories
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Browse categories created by other salon owners
                </Typography>
            </div>

            {/* Search */}
            <TextField
                fullWidth
                size="small"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
            />

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: 3
                }}
            >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Image</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Category</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Salon Name</strong>
                            </TableCell>

                            <TableCell>
                                <strong>City</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Owner</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {paginated.length > 0 ? (
                            paginated.map((category) => (
                                <TableRow
                                    hover
                                    key={category.id}
                                >
                                    <TableCell>
                                        <Avatar
                                            src={category.image}
                                            variant="rounded"
                                            sx={{
                                                width: 60,
                                                height: 60
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                        >
                                            {category.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        {category.salonDto?.name || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {category.salonDto?.city || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {category.userDto?.fullName || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={
                                                category.salonDto?.active
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                            color={
                                                category.salonDto?.active
                                                    ? "success"
                                                    : "error"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{ py: 8 }}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                    >
                                        No Categories Available
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        No categories from other salons are available.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(event, newPage) =>
                    setPage(newPage)
                }
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(
                        parseInt(event.target.value, 10)
                    );
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default CategoryOtherTable;