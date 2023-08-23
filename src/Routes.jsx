import {createBrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Favorites from "./pages/Favorites/Favorites";

export const router = createBrowserRouter([
        {
            path: "/",
            element: <Main/>,
        },
        {
            path: "/favorites",
            element: <Favorites/>,
        },
        
    ]
);