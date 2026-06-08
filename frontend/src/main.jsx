import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { BrowserRouter } from "react-router-dom"
import ChatProvider from "./Context/ChatProvider"
createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </ChatProvider>,
)
