import { Box, Button } from "@chakra-ui/react";
import Countdown from "react-countdown";
import NextLink from "next/link";

const Completionist = () => (
    <>
        <NextLink href="https://app.reve-s.net/">
            <Button colorScheme="teal" size={"lg"}>
                À qui?
            </Button>
        </NextLink>
        <br />
        <br />
        <Box letterSpacing={1}>
            <strong>
                (ps: si tu as scanne ce QR code apres minuit, le jeu est dejà en
                cours desole!)
            </strong>
        </Box>
    </>
);

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
        return <Completionist />;
    } else {
        return (
            <Box className="gradient-text" lineHeight={"1.2"} fontSize="5em">
                {hours}
                <br />
                {minutes}
                <br />
                {seconds}
            </Box>
        );
    }
};

const CountdownComponent = ({ date }: any) => {
    return <Countdown date={date} renderer={renderer} />;
};

export default CountdownComponent;
