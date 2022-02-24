import { Web3Provider } from "./Web3Provider";
import { ThemeProvider } from "./ThemeProvider";
import { EthereumProvider } from "./EthereumProvider";
import { Provider as StoreProvider } from "react-redux";

import { store } from "../state";

function Providers({ children }: React.PropsWithChildren<{}>) {
    return (
        <StoreProvider store={store}>
            <ThemeProvider>
                <EthereumProvider>
                    <Web3Provider>{children}</Web3Provider>
                </EthereumProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default Providers;
