import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesBySalonId } from "../../../../Redux/Category/categorySlice";
import { useParams } from "react-router-dom";
import { fetchSalonById } from "../../../../Redux/Salon/salonSlice";


const CategoryComponent = () => {
    const { id } = useParams()
    console.log(id);

    const dispatch = useDispatch();

    // ✅ Correctly get the slice of state
    const { categories, loadingCategories, error } = useSelector(
        (state) => state.categories
    );

    const { salon, loading } = useSelector((state) => state.salon);


    // ✅ Dispatch API call on mount or salonId change
    useEffect(() => {
        if (id) {
            dispatch(getCategoriesBySalonId(Number(id)));
            dispatch(fetchSalonById(Number(id)));
        }
    }, [dispatch, id]);

    // ✅ Optional: log whenever categories update
    useEffect(() => {
        console.log("Updated categories:", categories);
    }, [categories]);

    if (loadingCategories) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>;
    if (categories.length === 0) return <p>No categories found</p>;

    return (
        <div>
            {categories.map((cat) => (
                <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <img src={cat.image} alt={cat.name} width={50} />
                    <span>{cat.name}</span>
                </div>
            ))}
            {salon.name}
        </div>
    );
};

export default CategoryComponent;