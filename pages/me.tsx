import { CloseIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stat,
    StatLabel,
    StatNumber,
    useDisclosure,
    useToast,
    WrapItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { createRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { directus } from "../helpers/directus";
import DreamcoinComponent from "../components/DreamcoinComponent";

export default function Me() {
    const { data: session } = useSession() as any;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState(session.user.email);
    const toast = useToast();
    const emailForm = createRef<HTMLInputElement>();

    const [user, setUser] = useState(session.user);
    useEffect(() => {
        const getUser = async (userId: number): Promise<any> => {
            return directus.items("users").readOne(userId, {
                fields: ["*"],
            });
        };
        getUser(session.user.id).then((res) => setUser(res));
    }, []);

    const updateEmail = async () => {
        const updatedEmail = (emailForm as any).current.value;
        await directus.items("users").updateOne(session.user.id, {
            email: updatedEmail,
        });
        setEmail(updatedEmail);
        onClose();
        toast({
            title: "Modification effectuee",
            description: "Ton email a ete modifie avec succes",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Container pt={"30px"}>
            <Box position="fixed" top="30px" right={"30px"} zIndex={1}>
                <WrapItem cursor="pointer">
                    <NextLink href="/">
                        <CloseIcon />
                    </NextLink>
                </WrapItem>
            </Box>
            <Heading className="gradient-text" pb={"30px"} size="xl">
                ID #{user.id.split("-")[1]}
            </Heading>
            <Stat className="gradient-text">
                <StatLabel>Nom</StatLabel>
                <StatNumber>{user.name}</StatNumber>
                <br />
                <DreamcoinComponent user={user} />
                <br />
                <StatLabel>Email</StatLabel>
                <StatNumber>{email}</StatNumber>
                <br />
            </Stat>
            <Alert mb={"20px"} status="info" colorScheme="pink">
                <AlertIcon />
                Comme nous ne communiquons que par e-mail, assure toi que ton
                adresse soit à jour.
            </Alert>
            <Button letterSpacing="4px" colorScheme="pink" onClick={onOpen}>
                Modifier mon email
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{"Mise à jour de l'email"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                letterSpacing="4px"
                                type="email"
                                ref={emailForm}
                                placeholder={email}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            letterSpacing="4px"
                            colorScheme="pink"
                            mr={3}
                            onClick={updateEmail}
                        >
                            Mettre à jour
                        </Button>
                        <Button
                            letterSpacing="4px"
                            variant="ghost"
                            onClick={onClose}
                        >
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

Me.auth = true;
