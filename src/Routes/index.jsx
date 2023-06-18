import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import path from "./path";
import Home from "../Pages/Home.jsx";
import Layout from "../components/Layout/index.jsx";
import PageBookDetails from '../Pages/PageBookDetails.jsx'

//<HashRouter basename="/">  вместо BrowserRouter
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home/>}/>
                    <Route path="/book/:id" element={<PageBookDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;