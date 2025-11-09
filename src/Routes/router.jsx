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
import PrivateRoute from "./PrivateRoute";

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
                element: <PrivateRoute> <MyServices/> </PrivateRoute> 
            },
            {
                path: '/add-service',
                element: <PrivateRoute> <AddServices/> </PrivateRoute> 
            },
            {
                path: '/my-bookings',
                element: <PrivateRoute> <MyBookings/> </PrivateRoute> 
            },
            {
                path: '/profile',
                element: <PrivateRoute> <Profile/> </PrivateRoute>
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
