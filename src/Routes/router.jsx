import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import MyServices from "../Pages/MyServices";
import AddServices from "../Pages/AddServices";
import MyBookings from "../Pages/MyBookings";
import Profile from "../Pages/Profile";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Forgot from "../Components/Auth/Forgot";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true, 
                element: <Home/>
            },
            {
                path: '/services',
                element: <Services/>
            },
            {
                path: '/my-services',
                element: <MyServices/>
            },
            {
                path: '/add-service',
                element: <AddServices/>
            },
            {
                path: '/my-bookings',
                element: <MyBookings/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '/auth',
                element: <AuthLayout/>,
                children:[
                    {
                        path: '/auth',
                        element: <Login/>
                    },
                    {
                        path: '/auth/register',
                        element: <Register/>
                    },
                    {
                        path: '/auth/forgot',
                        element: <Forgot/>
                    },
                ]
            },

        ]
    }
])
