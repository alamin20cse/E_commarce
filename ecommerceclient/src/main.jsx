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



import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import AllUsers from './Shared/Dashboard/Allusers.jsx';
import Order from './Order/Order.jsx';
import Cart from './Shared/Dashboard/Cart.jsx';
import Payment from './Shared/Dashboard/Payment/Payment.jsx';
import ManageItems from './Shared/Dashboard/ManageItems/ManageItems.jsx';
import UpdateItem from './Shared/Dashboard/UpdateItem/UpdateItem.jsx';
import Menu from './Layout/Menu.jsx';
import PaymentHistory from './Shared/Dashboard/PaymentHistory/PaymentHistory.jsx';

const queryClient = new QueryClient()

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
        path:'/menu',
        element:<Menu></Menu>
      },

       {
        path:'/order',
        element:<Order></Order>
      },

    ]
  },


  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[

      // user
      {
        path:'cart',
        element:<Cart></Cart>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
       {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
      // admin

      
      {
        path:'addItems',
        element:<AddItems></AddItems>
      },
      {
        path:'users',
        element:<AllUsers></AllUsers>
      },
      {
         path:"manageItems",
         element:<ManageItems></ManageItems>
      },
       {
        path:'updateItem/:id',
        element:<UpdateItem></UpdateItem>,
        loader:({params})=>fetch(`http://127.0.0.1:8000/api/menu/${params.id}`)
        
      }
      
     
    ]
  }
]);



  





createRoot(document.getElementById('root')).render(
  <StrictMode>


     <QueryClientProvider client={queryClient}>
    <AuthProvider>
   <RouterProvider router={router} />
</AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
