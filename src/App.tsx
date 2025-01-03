import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/Home.tsx";
import Tracks from "./pages/Tracks.tsx";
import Cars from "./pages/Cars.tsx";
import Cart from "./pages/Cart.tsx";
import MyContent from "./pages/My-Content.tsx";
import Options from "./pages/Options.tsx";


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
        },
        {
            path:"/My-Content",
            element: <MyContent />
        },
        {
            path:"/Options",
            element: <Options />
        }

    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;