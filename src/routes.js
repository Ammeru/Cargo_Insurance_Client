import AdminPanelPage from "./pages/AdminPanelPage";
import BillingPage from "./pages/BillingPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {
    ADMIN_ROUTE,
    BILLING_ROUTE,
    LOGIN_COMPANY_ROUTE, LOGIN_ROUTE,
    MAIN_ROUTE,
    MyORDERS_ROUTE,
    ORDER_ROUTE,
    PROFILE_ROUTE, REGISTER_COMPANY_ROUTE, REGISTER_ROUTE
} from "./utils/consts";
import CompanyAuthPage from "./pages/CompanyAuthPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanelPage
    },
    {
        path: BILLING_ROUTE,
        Component: BillingPage
    },
    {
        path: MyORDERS_ROUTE,
        Component: MyOrdersPage
    },
    {
        path: ORDER_ROUTE,
        Component: OrderPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: REGISTER_ROUTE,
        Component: AuthPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTER_COMPANY_ROUTE,
        Component: CompanyAuthPage
    },
    {
        path: LOGIN_COMPANY_ROUTE,
        Component: CompanyAuthPage
    }
]