import {createHashRouter} from "react-router-dom"
import App from "./App";
import HomePage from "./page/HomePage";
import AddBattle from "./page/AddBattle";
import EditBattle from "./page/EditBattle";
import CommentsPage from "./page/CommentsPage";

export const router = createHashRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,

            },
            {
                path: "/add",
                element: <AddBattle/>
            },
            {
                path: "/comments",
                element: <CommentsPage/>
            },
            {
                path: "/battle/:id",
                element: <EditBattle/>
            }
        ],
    },
]);
