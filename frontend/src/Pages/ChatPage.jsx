import { ChatState } from "../context/ChatProvider"


function ChatPage() {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <Box>
        {/* {user && <MyChats />} */}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  )
}

export default ChatPage