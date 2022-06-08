import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import MovieHome from '../pages/MovieHome'
import MovieDetail from '../pages/MovieDetail'
import UserEditProfile from "../pages/UserEditProfile";

function AnimatedRoutes() {
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MovieHome />} />
                <Route path="/detail/:id" element={<MovieDetail />} />
                <Route path="/edit-profile" element={<UserEditProfile />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes