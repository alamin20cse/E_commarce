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
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
   <RouterProvider router={router} />
</AuthProvider>
  </StrictMode>,
)
