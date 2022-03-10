import { Button, Container, Icon } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { MdFacebook } from "react-icons/md";
import Options from "https://framer.com/m/Options-wwV8.js@XbOZCNVMFcuBbJbLah8I";

export default function Login() {
    return (
        <Container
            textAlign={"center"}
            maxW="lg"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", sm: "8" }}
        >
            <Icon
                cursor={"pointer"}
                boxSize="150px"
                as={MdFacebook}
                onClick={() =>
                    signIn("facebook", {
                        callbackUrl: "/",
                    })
                }
            />
            <Options />
        </Container>
    );
}
