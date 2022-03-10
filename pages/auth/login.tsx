import { Button, Container, Icon } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { MdFacebook } from "react-icons/md";

export default function Login() {
    return (
        <Container
            maxW="lg"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", sm: "8" }}
        >
            <Icon
                boxSize="100px"
                as={MdFacebook}
                onClick={() =>
                    signIn("facebook", {
                        callbackUrl: "/",
                    })
                }
            />
        </Container>
    );
}
