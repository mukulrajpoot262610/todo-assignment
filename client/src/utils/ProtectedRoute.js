import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const [login, setLogin] = useState(false);
    const { isAuth } = useSelector((state) => state.auth);
    const router = useNavigate();

    useEffect(() => {
        login && router("/");
    }, [login, router]);

    useEffect(() => {
        !isAuth && setLogin(true);
    }, [isAuth]);

    return <>{isAuth ? children : <Loader />}</>;
};