import React from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Categories from "./components/Categories/Categories"
import Category from "./components/Category/Category"
import Country from "./components/Countries/Countries"
import CountryDetails from "./components/CountryDetails/CountryDetails"
import Home from "./components/Home/Home"
import MealDetails from "./components/MealDetails/MealDetails"

export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories></Categories>,
        },
        {
          path: "/category/:strCategory",
          element: <Category></Category>,
        },
        {
          path: "/MealDetails/:meal",
          element: <MealDetails></MealDetails>,
        },
        {
          path: "/Countries",
          element: <Country></Country>,
        },
        {
          path: "/Country/:area",
          element: <CountryDetails></CountryDetails>,
        },
      ],
    },
  ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
