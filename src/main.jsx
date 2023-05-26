import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, {loader as rootLoader, action as rootAction} from "./routes/Root"

import ErrorPage from './error-page';
import Contact, {loader as contactLoader, action as contactAction} from './routes/Contact';
import EditContact, {action as editAction} from './routes/Edit';

import {action as destroyAction} from './routes/Destroy';
import Index from './routes/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            index: true,
            element: <Index></Index>
          },
          {
            path: "contacts/:contactId",
            element: <Contact></Contact>,
            loader: contactLoader,
            action: contactAction
          },
        ]
      },   
      {
        path: "contacts/:contactId/edit",
        element: <EditContact></EditContact>,
        loader: contactLoader,
        action: editAction
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
