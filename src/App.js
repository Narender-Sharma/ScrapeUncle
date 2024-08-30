import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import routes from "./routes"
import { Layout } from './components/layout/';
function App() {
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      // errorElement: <Page404 />,
      children: routes,
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
