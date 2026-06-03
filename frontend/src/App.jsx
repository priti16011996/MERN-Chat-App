import "./App.css"
import { Button } from "@chakra-ui/react"
import { Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ChatPage from "./Pages/ChatPage"
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} exact />
    </div>
  )
}

export default App