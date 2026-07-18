import type { RouteObject } from "react-router";

import Layout from "./layout";
import NotFound from "./pages/not-found";
import Settings from "./pages/settings";
import Search from "./pages/search";
import EmptyPage from "./pages/empty";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <NotFound />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "empty",
                element: <EmptyPage />,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
]


export default routes;