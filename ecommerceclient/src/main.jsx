import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeMain from './Layout/HomeMain.jsx';
import Home from './Layout/Home.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import SignUp from './Layout/SignUp.jsx';
import Login from './Layout/Login.jsx';
import AddItems from './Layout/AddItems.jsx';
import Dashboard from './Shared/Dashboard.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain></HomeMain>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/signup',
        element:<SignUp></SignUp>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'addItems',
        element:<AddItems></AddItems>
      },
    ]
  },


  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[

      // user
      
      // admin

      
      {
        path:'addItems',
        element:<AddItems></AddItems>
      },
      
      // {
      //   path:'updateItem/:id',
      //   element:<UpdateItem></UpdateItem>,
      //   loader:({params})=>fetch(`http://127.0.0.1:8000/api/menu/${params.id}`)
      // }
    ]
  }
]);



  





createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
   <RouterProvider router={router} />
</AuthProvider>
  </StrictMode>,
)
