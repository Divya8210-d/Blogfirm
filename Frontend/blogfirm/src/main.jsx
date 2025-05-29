import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Main from './AuthenticationPage/Mainpage';
import Home from './UserPage/Home';
import Draft from './UserPage/Draft';
import Published from './UserPage/Published';
import Publish from './UserPage/CreateBlog';
import Mainblog from './UserPage/Main';


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
    path: '/Home/publish',
    element: <Publish/>,
  } ,

    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rout} />
  </StrictMode>
);
