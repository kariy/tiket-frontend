import { store } from "../states";
import { Provider as StoreProvider } from "react-redux";

import ToastProvider from "./ToastProvider";
import { UserProvider } from "./UserProvider";
import { TiketProvider } from "./TiketProvider";
import { ThemeProvider } from "./ThemeProvider";
import { WalletProvider } from "./WalletProvider";
import { EthereumProvider } from "./EthereumProvider";

function Providers({ children }: React.PropsWithChildren<{}>) {
	return (
		<StoreProvider store={store}>
			<ThemeProvider>
				<ToastProvider />
				<EthereumProvider>
					<WalletProvider>
						<UserProvider>
							<TiketProvider>{children}</TiketProvider>
						</UserProvider>
					</WalletProvider>
				</EthereumProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

export default Providers;
