import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
    Box,
    ChakraProvider,
    ColorModeScript,
    Spinner,
} from "@chakra-ui/react";
import { SessionProvider, useSession } from "next-auth/react";
import theme from "./theme";

function Rise({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />

                {(Component as any).auth ? (
                    <Auth>
                        <>
                            <Component {...pageProps} />
                        </>
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </SessionProvider>
    );
}

function Auth({ children }: any) {
    const { data: session } = useSession({ required: true });
    const isUser = !!session?.user;

    if (isUser) {
        return children;
    }

    return (
        <Box padding="50px" textAlign="center">
            <Spinner size="xl" />
        </Box>
    );
}

export default Rise;
