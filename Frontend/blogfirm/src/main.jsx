import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Main from './AuthenticationPages/Mainpage';
import Home from './UserPages/Home';
import Draft from './UserPages/Draft';
import Published from './UserPages/Published';
import Create from './UserPages/CreateBlog';
import Mainblog from './UserPages/Main';


const rout = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/Home/',
    element: <Home/>,
    children: [
             {
    path: '/Home/blog',
    element: <Mainblog/>,
  },
       {
    path: '/Home/draft',
    element: <Draft/>,children:[      {
    path: 'Home/draft/edit',
    element:null,
  } ]
  },
    {
    path: '/Home/userpost',
    element: <Published/>,children:[      {
    path: 'Home/userpost/edit',
    element:null,
  } ]
  },
    {
    path: '/Home/create',
    element: <Create/>,
  } ,

    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rout} />
  </StrictMode>
);
