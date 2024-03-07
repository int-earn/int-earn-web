import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'
import Join from '../pages/join'
import { Login } from '../pages/login'
import { Board } from '../pages/board'
import AddPost from '../pages/addPost'
import ViewPost from '../pages/viewPost'
import EditPost from '../pages/editPost'
import MyPage from '../pages/myPage'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/board" element={<Board />} />
                <Route path="/addPost" element={<AddPost />} />
                <Route path="/viewPost/:id" element={<ViewPost />} />
                <Route path="/editPost/:id" element={<EditPost />} />
                <Route path="/myPage" element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    )
}
