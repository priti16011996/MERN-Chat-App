import { Container, Box, Text, Tabs } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from "react-router";

function HomePage() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs.Root
          defaultValue="login"
          variant="plain"
          css={{
            "--tabs-indicator-bg": "colors.blue.subtle",
            "--tabs-indicator-shadow": "shadows.xs",
            "--tabs-trigger-radius": "radii.full",
          }}
        >
          <Tabs.List mb="1em" display="flex" alignItems="center" justifyContent="center"  >
            <Tabs.Trigger flex="1" value="login" alignItems="center" justifyContent="center">Login</Tabs.Trigger>
            <Tabs.Trigger flex="1" value="signup" alignItems="center" justifyContent="center">Sign Up</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="login"><Login /></Tabs.Content>
          <Tabs.Content value="signup"><Signup /></Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  )
}

export default HomePage
