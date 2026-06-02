import React, { useState } from "react";
import {
    Field,
    Input,
    InputGroup,
    VStack,
    Button,
} from "@chakra-ui/react";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = () => {
    }
    return (
        <VStack gap="5" width="100%">
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Field.Root>
            <Field.Root>
                <Field.Label>Password</Field.Label>

                <InputGroup
                    endElement={
                        <Button
                            size="xs"
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    }
                >
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
            </Field.Root>
            <Button
                colorPalette="blue"
                width="100%"
                mt={4}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
                colorPalette="red"
                width="100%"
                mt={0.5}
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack >
    )
}

export default Login


