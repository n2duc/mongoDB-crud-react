import axios from "axios";
import { useEffect, useState } from "react";
import { usePopupState, useDebounce } from "../hooks";

import Button from "../components/Button";
import ProductTable from "../components/ProductTable";
import FormPopup from "../components/FormPopup";
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
import BackButton from "../components/BackButton";
import usePagination from "../hooks/usePagination";

const API_BASE = "http://localhost:5000";
const DEFAULT_VALUE = { name: "", color: "Black", brand: "", price: 0 };

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [idProduct, setIdProduct] = useState("");
    const [updateUI, setUpdateUI] = useState(false);

    const { currentPage, setCurrentPage, displayedProducts, totalPages } = usePagination(products);

    const {
        value: newProduct,
        show: popupActive,
        setShow: setPopupActive,
        handleClose: closePopup,
        handleChange: handleInputChange,
    } = usePopupState(DEFAULT_VALUE);

    const {
        value: updateData,
        setValue: setUpdateData,
        show: updatePopup,
        setShow: setUpdatePopup,
        handleClose: closeUpdatePopup,
        handleChange: handleInputChangeUpdate,
    } = usePopupState(DEFAULT_VALUE);

    // Search filter
    const [searchProduct, setSearchProduct] = useState("");
    const searchDebouce = useDebounce(searchProduct, 500);

    useEffect(() => {
        document.title = "Products Page";
    }, []);

    useEffect(() => {
        axios
            .get(API_BASE + "/products")
            .then((res) => {
                setProducts(res.data);
                setOriginalProducts(res.data);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, [updateUI]);

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(
                `${API_BASE}/product/delete/${id}`
            );
            const data = response.data;
            setProducts((products) =>
                products.filter((product) => product._id !== data._id)
            );
            setUpdateUI((prevState) => !prevState);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const addProduct = async () => {
        try {
            const response = await axios.post(
                `${API_BASE}/product/new`,
                newProduct,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = response.data;
            setProducts([...products, data]);
            setUpdateUI((prevState) => !prevState);
            closePopup();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleFetchProduct = async (id) => {
        setUpdatePopup(true);
        setIdProduct(id);
        try {
            const response = await axios.get(`${API_BASE}/product/v1/${id}`);
            const data = response.data;
            setUpdateData(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const updateProduct = async (id) => {
        try {
            await axios.put(API_BASE + "/product/update/" + id, updateData, {
                headers: { "Content-Type": "application/json" },
            });
            closeUpdatePopup();
            setUpdateUI((prevState) => !prevState);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handeAddNewSubmit = (e) => {
        e.preventDefault();
        addProduct();
    };
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        updateProduct(idProduct);
    };

    // Search product
    useEffect(() => {
        const dataFilter = originalProducts.filter((item) =>
            item.name.toLowerCase().includes(searchDebouce.toLowerCase())
        );
        setProducts(dataFilter);
    }, [searchDebouce, originalProducts]);

    return (
        <div className="p-7 container relative">
            <BackButton />
            <div className="flex items-center justify-between pb-4">
                <SearchInput
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder="Search for items"
                ></SearchInput>
                <Button onClick={() => setPopupActive(true)}>Add new</Button>
            </div>
            <ProductTable
                productData={displayedProducts}
                handleRemoveProduct={deleteProduct}
                handleFetchProduct={handleFetchProduct}
            ></ProductTable>
            {popupActive && (
                <FormPopup
                    data={newProduct}
                    title="Add new product"
                    handleChange={handleInputChange}
                    handleClose={closePopup}
                    typeButton="Add new"
                    handleSubmit={handeAddNewSubmit}
                ></FormPopup>
            )}
            {updatePopup && (
                <FormPopup
                    data={updateData}
                    title="Update product"
                    handleChange={handleInputChangeUpdate}
                    handleClose={closeUpdatePopup}
                    handleSubmit={handleUpdateSubmit}
                    typeButton="Update"
                ></FormPopup>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setCurrentPage}
                ></Pagination>
            )}
        </div>
    );
};

export default ProductPage;
