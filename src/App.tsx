import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/Home.tsx";
import Tracks from "./pages/Tracks.tsx";
import Cars from "./pages/Cars.tsx";
import Cart from "./pages/Cart.tsx";


const App = ()=> {
    const router = createBrowserRouter([
        // All paths which are used in the app
        //Index
        {
            path: "/",
            element: <Home />
        },
        {
            path:"/Tracks",
            element: <Tracks />,
        },
        {
            path:"/Cars",
            element: <Cars />
        },
        {
            path:"/Cart",
            element: <Cart />
        }

    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;