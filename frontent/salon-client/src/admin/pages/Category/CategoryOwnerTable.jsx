import React, { useEffect, useState } from "react";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar, Typography, CircularProgress, TextField, TablePagination, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, InputAdornment, Chip
} from "@mui/material";
import { Edit, Delete, Search, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOwnerCategories, updateCategory, deleteCategory } from "../../../Redux/Category/categorySlice";
import Swal from "sweetalert2";

const CategoryOwnerTable = () => {
    const dispatch = useDispatch();
    const { ownerCategories, loadingCategories } = useSelector((store) => store.categories);
    console.log(ownerCategories);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({
        id: "",
        name: "",
        image: ""
    });

    useEffect(() => {
        dispatch(getOwnerCategories());
    }, [dispatch]);

    const filtered = ownerCategories.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Category?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        const response = await dispatch(deleteCategory(id));

        if (deleteCategory.fulfilled.match(response)) {
            Swal.fire({
                title: "Deleted!",
                text: "Category deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            dispatch(getOwnerCategories());
        }
        else {
            Swal.fire({
                title: "Error",
                text: response.payload || "Failed to delete category",
                icon: "error",
            });
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setEditOpen(true);
    }

    const handleUpdate = async () => {
        const result = await dispatch(
            updateCategory({
                id: selectedCategory.id,
                categoryData: {
                    name: selectedCategory.name,
                    image: selectedCategory.image,
                    salonId: selectedCategory.salonDto?.id
                }
            })
        );

        if (updateCategory.fulfilled.match(result)) {
            Swal.fire({
                title: "Updated!",
                text: "Category updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            setEditOpen(false);
            dispatch(getOwnerCategories());
        }
        else {
            Swal.fire({
                title: "Update Failed",
                text: result.payload || "Something went wrong",
                icon: "error",
            })
        }

    };

    if (loadingCategories) {
        return (
            <div className="flex justify-center py-10">
                <CircularProgress />
            </div>
        );
    }


    return (
        <div className="space-y-5">
            <TextField
                fullWidth
                size="small"
                placeholder="Search your categories..."
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
                            <TableCell>Image</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Salon</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginated.length > 0 ? (
                            paginated.map((category) => (
                                <TableRow hover key={category.id}>
                                    <TableCell>
                                        <Avatar
                                            src={category.image}
                                            variant="rounded"
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 2
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}>
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
                                        <Chip
                                            label={
                                                category.salonDto?.active ? "Active" : "Inactive"
                                            }
                                            color={
                                                category.salonDto?.active ? "success" : "error"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                    <Typography variant="h5" fontWeight={700}>
                                        No Categories Found
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        You haven't created any categories yet.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, page) =>
                    setPage(page)
                }
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(
                        parseInt(e.target.value)
                    );
                    setPage(0);
                }}
            />

            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Edit Category
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Category Name"
                        value={selectedCategory.name}
                        onChange={(e) =>
                            setSelectedCategory({
                                ...selectedCategory,
                                name: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image Url"
                        value={selectedCategory.image}
                        onChange={(e) =>
                            setSelectedCategory({
                                ...selectedCategory,
                                image: e.target.value
                            })
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setEditOpen(false)
                        }
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdate}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default CategoryOwnerTable