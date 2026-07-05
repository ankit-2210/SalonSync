import React, { useEffect } from 'react'
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../Redux/Auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            dispatch(loginUser({
                data: values,
                navigate: navigate
            }));
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
            <div className="space-y-5">
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        paddingY: '10px',
                        '&:hover': { backgroundColor: '#333' }
                    }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign In"}
                </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="text-black font-medium hover:underline">
                    Register
                </Link>
            </p>
        </form>
    )
}

export default Login;