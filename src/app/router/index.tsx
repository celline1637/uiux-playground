import { MainLayout } from "@/components/layout"
import Page404 from "@/pages/error/404"
import { lazy } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { paths } from "../../routes/paths"
import { componentsRoutes } from "./components"
import { patternsRoutes } from "./patterns"

// ----------------------------------------------------------------------

const HomePage = lazy(() => import("@/pages/home"))

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: paths.notFound,
          element: <Page404 />,
        },

        ...patternsRoutes,

        ...componentsRoutes,

        // No match
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ])
}
