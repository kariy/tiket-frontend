import { store } from "../states";
import { Provider as StoreProvider } from "react-redux";

import { UserProvider } from "./UserProvider";
import { ThemeProvider } from "./ThemeProvider";
import { WalletProvider } from "./WalletProvider";
import { EthereumProvider } from "./EthereumProvider";

function Providers({ children }: React.PropsWithChildren<{}>) {
	return (
		<StoreProvider store={store}>
			<ThemeProvider>
				<EthereumProvider>
					<WalletProvider>
						<UserProvider>{children}</UserProvider>
					</WalletProvider>
				</EthereumProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

export default Providers;
