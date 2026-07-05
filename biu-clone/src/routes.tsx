import type { RouteObject } from "react-router";

import Layout from "./layout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />
    }
]


export default routes;