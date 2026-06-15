import React, { useState } from "react";
import {
    Field,
    Input,
    InputGroup,
    VStack,
    Button,
    HStack,
    For
} from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const postDetails = (Image) => {
        setLoading(true);
        if (Image === undefined) {
            toaster.create({
                title: "File saved successfully",
                type: "success",
                closable: true,
                duration: 5000,
            })
            return;
        }
        if (Image.type == "image/jpeg" || Image.type == "image/png") {
            const data = new FormData();
            data.append("file", Image);
            data.append("upload_preset", "CHAT-APP");
            data.append("cloud_name", "dva9r5e2p");
            fetch("https://api.cloudinary.com/v1_1/dva9r5e2p/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                    toaster.create({
                        title: "Error Occured while uploading the image",
                        type: "error",
                        closable: true,
                        duration: 5000,
                    })
                });
        }
        else {
            toaster.create({
                title: "Please select a valid image file (JPEG or PNG)",
                type: "warning",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
            return;
        }
    }
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toaster.create({
                title: "Please provide all the information",
                type: "warning",
                closable: true,
                duration: 5000,
            });
            setLoading(false);
            return;
        }
        if (password != confirmPassword) {
            toaster.create({
                title: "Password Don't Match",
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
                "/api/user",
                { name, email, password, pic },
                config
            );
            toaster.create({
                title: "Registration Successful",
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
                loading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    );
}

export default Signup;