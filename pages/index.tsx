import { Center, Container, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import OfferDrink from "https://framer.com/m/offerDrink-N8s7.js@9CRDIPHGMR7EsliQfrb9";
import Countdown from "react-countdown";

export default function Main() {
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <Container textAlign={"center"}>
            <Heading py="20px">REVE.S</Heading>
            <Countdown date={Date.now() + 10000} />
            <Center>
                {" "}
                <OfferDrink
                    // Using default values:
                    image={session?.user?.image}
                    name={session?.user?.name}
                />
            </Center>
        </Container>
    );
}
Main.auth = true;
