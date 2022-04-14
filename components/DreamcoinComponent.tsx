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

const DreamcoinComponent = ({ user }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <StatLabel>Dreamcoins</StatLabel>
            <StatNumber>
                {user.dreamcoin}
                <QuestionOutlineIcon
                    ml={4}
                    cursor={"pointer"}
                    onClick={onOpen}
                />
            </StatNumber>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Qu'est qu'un dreamcoin?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody letterSpacing={2}>
                        Felicitation! Ta venue ce soir t'a permis de remporter
                        ton premier dreamcoin!
                        <br />
                        <br />
                        Il s'agit d'une monnaie festive virtuelle que tu peux
                        accumuler grâce à des concours que nous mettrons
                        prochainement en place.
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

export default DreamcoinComponent;
