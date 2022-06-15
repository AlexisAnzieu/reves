import {
    Box,
    Button,
    Container,
    Heading,
    WrapItem,
    Avatar,
    Link,
    Image,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { AttachmentIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

import { ID } from "@directus/sdk";
import { useEffect, useState } from "react";
import CountdownComponent from "../components/CountdownComponent";
import { directus } from "../helpers/directus";

type MatchedUser = {
    name: string;
    image: string;
};

export async function getServerSideProps() {
    const event = await directus
        .items("Event")
        .readOne("1b40f14f-389d-435d-ba2d-4a086abf32f9", {
            fields: ["*", "location.*"],
        });

    return {
        props: { event },
    };
}

export default function Main({ event }: any) {
    const { data: session } = useSession();
    const [matchedUser, setMatchedUser] = useState<MatchedUser | null>(null);
    useEffect(() => {
        const fetchMatchedUser = async (): Promise<MatchedUser | null> => {
            const { matchedUser: matchedUserId }: any = await directus
                .items("users")
                .readOne((session as any).user.id, {
                    fields: ["matchedUser"],
                });
            if (!matchedUserId) {
                return null;
            }
            return directus.items("users").readOne(matchedUserId as ID, {
                fields: ["name", "image"],
            }) as Promise<MatchedUser>;
        };

        fetchMatchedUser().then((userId) => setMatchedUser(userId));
    }, []);

    return (
        <>
            <Container textAlign={"center"}>
                <Box position="fixed" top="20px" right={"16px"} zIndex={1}>
                    <WrapItem cursor="pointer">
                        <NextLink href="/me" passHref>
                            <Avatar src={session!.user?.image || "?"} />
                        </NextLink>
                    </WrapItem>
                </Box>
                <Heading className="gradient-text" p="20px 0px 0px 0px">
                    {event.name}
                </Heading>
                <br />
                <br />
                {(session!.user?.name === "Alexis Anzieu" ||
                    session!.user?.name === "Margot Chevrier" ||
                    session!.user?.name === "Florent Casamayou" ||
                    session!.user?.name === "Jonathan Avenel") && (
                    <NextLink href="/api/matchUsers">
                        <Button colorScheme="teal" size={"lg"}>
                            Secret Shota trigger
                        </Button>
                    </NextLink>
                )}
                <br />
                {/* 
                Prochain evenement:
                <Heading size={"xl"} color={"orange"}>
                    Pas d'événement à venir pour le moment
                    REVE.S D'AGRUMES
                </Heading>
                <a
                    href="https://www.facebook.com/events/432073024956289"
                    className="href"
                >
                    <Button colorScheme="orange" size={"xl"} mt={5} p={5}>
                        Plus d'information ici
                    </Button>
                </a> */}
                Hosted by{" "}
                <Link letterSpacing={2} href={event.location.url} isExternal>
                    {event.location.name}
                    <ExternalLinkIcon mx="2px" />
                </Link>
                <br />
                <br />
                <NextLink href="/MENU_Nouvel-Eta_14mars.pdf">
                    <Button
                        colorScheme="pink"
                        leftIcon={<AttachmentIcon />}
                        variant="outline"
                        letterSpacing={2}
                    >
                        Voir les boissons
                    </Button>
                </NextLink>
                <br />
                <br />
                {!matchedUser && (
                    <Box>
                        <Heading color="purple" pb={"10px"} size="xl">
                            Secret Shota
                        </Heading>
                        <CountdownComponent date={event.date} />
                    </Box>
                )}
                {matchedUser && (
                    <Box>
                        Offre un verre à
                        <Heading pb={"20px"} size="xl">
                            {(matchedUser as any).name}!
                        </Heading>
                        <Image
                            src={matchedUser.image}
                            borderRadius="full"
                            alt=""
                        />
                    </Box>
                )}
            </Container>
        </>
    );
}
Main.auth = true;
