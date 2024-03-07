import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'
import Join from '../pages/join'
import { Login } from '../pages/login'
import { Board } from '../pages/board'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/board" element={<Board />} />
            </Routes>
        </BrowserRouter>
    )
}
