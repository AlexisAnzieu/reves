import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    StatLabel,
    StatNumber,
    useDisclosure,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const SourireComponent = ({ user }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <StatLabel>Sourires</StatLabel>
            <StatNumber>
                {user.sourire}
                <QuestionOutlineIcon
                    ml={4}
                    cursor={"pointer"}
                    onClick={onOpen}
                />
            </StatNumber>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Qu'est qu'un sourire?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody letterSpacing={2}>
                        Il s'agit d'une monnaie que tu peux obtenir en rendant
                        service à des associations autour de chez toi.
                        <br />
                        <br /> À terme, tu pourras obtenir des entrees aux
                        futurs evenements payants, des productions de tes DJ
                        favoris etc...
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            letterSpacing={2}
                            colorScheme="pink"
                            mr={3}
                            onClick={onClose}
                        >
                            Trop cool!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SourireComponent;
