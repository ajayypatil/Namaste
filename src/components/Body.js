import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter,} from "react-router-dom";
 import "../MovieList.css"


const Body = () => {
  
 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div  className="w-screen">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
