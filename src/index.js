import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

import { QueryClient, QueryClientProvider } from "react-query"

const root = ReactDOM.createRoot(document.getElementById("root"))
let query = new QueryClient()

root.render(
  <QueryClientProvider client={query}>
    <App />
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
)

reportWebVitals()
