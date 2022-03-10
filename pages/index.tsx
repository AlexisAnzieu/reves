import { Container, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Image } from "@chakra-ui/react";

export default function Main() {
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <Container textAlign={"center"}>
            <Heading py="20px">REVE.S</Heading>
            {session?.user?.name}
            <Image src={session?.user?.image || ""} />
        </Container>
    );
}
Main.auth = true;
