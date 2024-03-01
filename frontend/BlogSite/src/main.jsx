import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BlogsContextProvider } from './contexts/blogsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogsContextProvider>
      <App />
    </BlogsContextProvider>
  </React.StrictMode>,
)
