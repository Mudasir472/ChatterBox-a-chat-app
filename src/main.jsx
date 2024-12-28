import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/Context.jsx'
import { SocketProvider } from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ContextProvider>
  </StrictMode>
)
