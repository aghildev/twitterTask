import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import App from './App';
import HomepageBody from './components/HomepageBody';
import MytweetsBody from './components/MytweetsBody';
import Error from './components/Error';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement: <Error/>,
    children:[
      {
        path:"/",
        element:<Login/>

      },
      {
        path:"/homepage",
        element:<HomepageBody />,
    
      },
      {
        path:"/mytweets",
        element:<MytweetsBody />,
    
      }
    ]

  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
 
 
    <>
      <RouterProvider router={appRouter}/>
    </>
 
)
