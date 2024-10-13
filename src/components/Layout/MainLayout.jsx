import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="p-4 mx-auto max-w-7xl min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout;
