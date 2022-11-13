import {createHashRouter} from "react-router-dom"
import App from "./App";
import HomePage from "./page/HomePage";
import CommentsPage from "./page/CommentsPage";
import SettingsPage from "./page/SettingsPage";
import AddBattle from "./page/AddBattle";
import EditBattle from "./page/EditBattle";

export const router = createHashRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,

            },
            {
                path: "/comments",
                element: <CommentsPage/>
            },
            {
                path: "/tools",
                element: <SettingsPage/>
            },
            {
                path: "/add",
                element: <AddBattle/>
            },
            {
                path: "/battle/:id",
                element: <EditBattle/>
            }
        ],
    },
]);
