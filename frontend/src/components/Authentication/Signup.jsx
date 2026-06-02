import React, { useState } from "react";
import {
    Field,
    Input,
    InputGroup,
    VStack,
    Button,
} from "@chakra-ui/react";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");

    const postDetails = (file) => {
    }
    const submitHandler = () => {
    }
    return (
        <VStack gap="5" width="100%">
            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Field.Root>

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

            <Field.Root>
                <Field.Label>Confirm Password</Field.Label>

                <InputGroup
                    endElement={
                        <Button
                            size="xs"
                            variant="ghost"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                    }
                >
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </InputGroup>
            </Field.Root>
            <Field.Root>
                <Field.Label>Upload your Picture</Field.Label>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </Field.Root>
            <Button
                colorPalette="blue"
                width="100%"
                mt={4}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
}

export default Signup;