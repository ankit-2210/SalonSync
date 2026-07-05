import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/categories";
const OWNER_URL = "/api/categories/salon-owner";

// GET    /api/categories
// GET    /api/categories/{id}
// GET    /api/categories/salon/{id}

// POST   /api/categories/salon-owner
// PUT    /api/categories/salon-owner/{id}
// DELETE /api/categories/salon-owner/{id}

// GET    /api/categories/salon-owner/category/{id}/salon/{salonId}

// get all Categories
export const getAllCategories = createAsyncThunk("category/getAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(BASE_URL);
        console.log(response.data);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// get category By Id
export const getCategoryById = createAsyncThunk("category/getById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`${BASE_URL}/${id}`);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// get owner category
export const getOwnerCategories = createAsyncThunk("category/getOwnerCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${BASE_URL}/owner`);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// get not owner category
export const getOthersCategories = createAsyncThunk("category/getOtherCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${BASE_URL}/others`);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// get categories by salonId
export const getCategoriesBySalonId = createAsyncThunk("category/getBySalon", async (salonId, { rejectWithValue }) => {
    try {
        const response = await api.get(`${BASE_URL}/salon/${salonId}`);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});


// create category
export const createCategory = createAsyncThunk("category/create", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await api.post(OWNER_URL, categoryData);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
});

// update category
export const updateCategory = createAsyncThunk("category/id", async ({ id, categoryData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`${OWNER_URL}/${id}`, categoryData);
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
});

// delete category
export const deleteCategory = createAsyncThunk("category/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${OWNER_URL}/${id}`);
        return id;
    }
    catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message
        );
    }
});


const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        ownerCategories: [],
        otherCategories: [],

        category: null,

        loadingCategories: false,
        loadingCategory: false,

        creating: false,
        updating: false,
        deleting: false,

        error: null,
        message: null
    },
    reducers: {
        clearCategoryState: (state) => {
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(getAllCategories.pending, (state) => {
                state.loadingCategories = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.payload;
            })

            // get by id
            .addCase(getCategoryById.pending, (state) => {
                state.loadingCategory = true;
                state.error = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loadingCategory = false;
                state.category = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loadingCategory = false;
                state.error = action.payload;
            })

            // get owner category
            .addCase(getOwnerCategories.pending, (state) => {
                state.loadingCategories = true;
            })
            .addCase(getOwnerCategories.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.ownerCategories = action.payload;
            })
            .addCase(getOwnerCategories.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.payload;
            })

            // get not owner category
            .addCase(getOthersCategories.pending, (state) => {
                state.loadingCategories = true;
            })
            .addCase(getOthersCategories.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.othersCategories = action.payload;
            })
            .addCase(getOthersCategories.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.payload;
            })

            // get by salon
            .addCase(getCategoriesBySalonId.pending, (state) => {
                state.loadingCategories = true;
                state.error = null;
            })
            .addCase(getCategoriesBySalonId.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload;
                state.message = "Categories fetched successfully";
            })
            .addCase(getCategoriesBySalonId.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.payload;
            })

            // create
            .addCase(createCategory.pending, (state) => {
                state.creating = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.creating = false;
                state.categories.push(action.payload);
                state.message = "Category created successfully";
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateCategory.pending, (state) => {
                state.updating = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.updating = false;
                state.categories = state.categories.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload;
            })

            // delete
            .addCase(deleteCategory.pending, (state) => {
                state.deleting = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleting = false;
                state.categories = state.categories.filter(
                    (item) => item.id !== action.payload
                );
                state.message = "Category deleted successfully";
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload;
            })
    }
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;