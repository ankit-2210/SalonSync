import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton,
    Avatar, TextField, TablePagination,
    Dialog, DialogTitle, DialogContent, Typography,
    Switch, Button
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalons, deleteSalon, toggleSalonStatus, updateSalon } from "../../../Redux/Salon/salonSlice";
import Swal from "sweetalert2";

const SalonTable = () => {
    const dispatch = useDispatch();
    const { salons, loading } = useSelector((state) => state.salon);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchSalons());
    }, [dispatch]);

    const filtered = salons.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.city?.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleView = (salon) => {
        setSelectedSalon(salon);
        setFormData(salon);
        setEditMode(false);
        setImgIndex(0);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This salon will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            dispatch(deleteSalon(id));
            Swal.fire("Deleted!", "Salon removed.", "success");
        }
    };

    if (loading)
        return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="space-y-4">
            <TextField
                size="small"
                placeholder="Search salon..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
                InputProps={{
                    startAdornment: <Search fontSize="small" />
                }}
            />

            {/* 📋 Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Salon</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map((s) => (
                            <TableRow key={s.id} hover>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={s.images?.[0]} />
                                        {s.name}
                                    </div>
                                </TableCell>
                                <TableCell>{s.city}</TableCell>
                                <TableCell>{s.phoneNumber}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={s.active}
                                        onChange={() =>
                                            dispatch(toggleSalonStatus(s.id))
                                        }
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleView(s)}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(s.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    Salon Details
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        style={{ float: "right" }}
                    >
                        {editMode ? "Cancel" : "Edit"}
                    </Button>
                </DialogTitle>

                <DialogContent>
                    {selectedSalon && (
                        <div className="space-y-3">
                            <div className="relative">
                                <img
                                    src={selectedSalon.images?.[imgIndex]}
                                    alt="salon"
                                    className="w-full h-48 object-cover rounded"
                                />
                                <button
                                    onClick={() =>
                                        setImgIndex((prev) =>
                                            prev === 0
                                                ? selectedSalon.images.length - 1
                                                : prev - 1
                                        )
                                    }
                                    className="absolute left-2 top-1/2 bg-black text-white px-2 py-1 rounded">
                                    ◀
                                </button>
                                <button
                                    onClick={() =>
                                        setImgIndex((prev) =>
                                            prev === selectedSalon.images.length - 1
                                                ? 0
                                                : prev + 1
                                        )
                                    }
                                    className="absolute right-2 top-1/2 bg-black text-white px-2 py-1 rounded"
                                >
                                    ▶
                                </button>
                            </div>

                            {/* ✏️ Editable fields */}
                            {["name", "city", "address", "phoneNumber", "email"].map((field) => (
                                editMode ? (
                                    <TextField
                                        key={field}
                                        fullWidth
                                        label={field}
                                        value={formData[field] || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field]: e.target.value
                                            })
                                        }
                                    />
                                ) : (
                                    <Typography key={field}>
                                        <b>{field}:</b> {selectedSalon[field]}
                                    </Typography>
                                )
                            ))}

                            <Typography>
                                <b>Status:</b> {selectedSalon.active ? "Active" : "Disabled"}
                            </Typography>

                            {editMode && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => {
                                        dispatch(updateSalon({
                                            salonId: formData.id,
                                            salon: formData
                                        }));
                                        setEditMode(false);
                                    }}
                                >
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SalonTable;