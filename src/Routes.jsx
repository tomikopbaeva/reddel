import {createBrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";

export const router = createBrowserRouter([
        {
            path: "/",
            element: <Main/>,
        },
    ]
);