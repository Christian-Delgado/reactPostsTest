import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Post, {
  loader as postLoader,
} from "./routes/post";
import EditPost, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "posts/:postId",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "posts/:postId/edit",
        element: <EditPost />,
        loader: postLoader,
        action: editAction,
      },
      {
        path: "posts/:postId/destroy",
        action: destroyAction,
      },
    ],
  },
  {
    path: "posts/:postId",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)