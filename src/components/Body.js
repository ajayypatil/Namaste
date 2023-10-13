import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter,} from "react-router-dom";
 import "../MovieList.css"
import MovieDescription from "./MovieDescription";


const Body = () => {
  
 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        {
          path: "/browse/:movieTitle",
          element: <MovieDescription/>
        }
      ]
    },
    
  ]);

  return (
    <div  className="w-screen">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
