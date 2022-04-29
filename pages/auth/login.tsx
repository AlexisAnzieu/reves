import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { MdFacebook } from "react-icons/md";

export default function Login() {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <Container textAlign={"center"} maxW="lg">
            <Heading
                className="gradient-text"
                letterSpacing={"2px"}
                p="20px 0px 40px 0px"
            >
                REVE.S
            </Heading>
            {isLoading && (
                <Box padding="50px" textAlign="center">
                    <Spinner size="xl" />
                </Box>
            )}
            {!isLoading && (
                <Button
                    letterSpacing={3}
                    onClick={() => {
                        signIn("facebook", {
                            callbackUrl: "/",
                        });
                        setIsLoading(true);
                    }}
                    maxW={"md"}
                    colorScheme={"facebook"}
                    leftIcon={<MdFacebook />}
                >
                    <Center>Continuer avec Facebook</Center>
                </Button>
            )}
        </Container>
    );
}
