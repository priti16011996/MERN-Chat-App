import React, { useState } from "react";
import {
    Field,
    Input,
    InputGroup,
    VStack,
    Button,
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toaster.create({
                title: "Please provide all the information",
                type: "warning",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                }
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            toaster.create({
                title: "Login Successful",
                type: "warning",
                closable: true,
                duration: 5000,
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            history.push("/chats");
            setLoading(false);

        } catch (err) {
            toaster.create({
                title: "Error Occured",
                description: err.response?.data?.message || err.message,
                type: "error",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
        }
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
                loading={loading}
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


