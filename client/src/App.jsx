import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import HomePage from "./pages/HomePage";
import Loading from "./pages/Loading";
const ProductPage = lazy(() => import("./pages/ProductPage"));
const UserPage = lazy(() => import("./pages/UserPage"));

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    theme="dark"
                />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/users" element={<UserPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
