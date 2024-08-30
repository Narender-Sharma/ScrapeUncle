import React from "react"
import PathConstants from "./pathConstants"
const LoginPage = React.lazy(() => import("../pages/LoginPage"))
const DashBoard = React.lazy(() => import("../pages/DashBoardPage"))
const AddBanner = React.lazy(() => import("../pages/AddBannerPage"))
const CityMange = React.lazy(() => import("../pages/CityManage"))
const WeightMange = React.lazy(()=> import("../pages/MeasurementManage"))

const routes = [
    { path: PathConstants.HOME, element: <LoginPage /> },
    { path: PathConstants.DASHBOARD, element: <DashBoard /> },
    { path: PathConstants.ADDBANNER, element: <AddBanner /> },
    { path: PathConstants.CITYUPDATE, element: <CityMange /> },
    { path: PathConstants.WEIGHTMANGE, element: <WeightMange /> },
    { path: '', element: <LoginPage />}
    // other mappings ...
]

export default routes