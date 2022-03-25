import BarLoader from "@components/Loaders/BarLoader";
import { useTicketFactory } from "providers/TiketProvider";
import { useWallet } from "providers/WalletProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	height: 100%;
	display: flex;
	align-items: center;

	& > div {
		margin: 0 auto;
	}
	/* flex-direction: column; */
`;

interface IFormWaitingProps {
	onSuccess: () => any;
}

export function CreateTicketWaiting({ onSuccess }: IFormWaitingProps) {
	const wallet = useWallet();
	const factory = useTicketFactory();

	const listenToNewTicketEvent = useCallback(
		(ignoreBlockNumber: number) => {
			if (!factory.contract) return;

			const filter = factory.contract.filters.NewTicket(
				wallet.connectedAddress
			);

			factory.contract.on(filter, (...args) => {
				const event = args[2];
				if (event.blockNumber <= ignoreBlockNumber) return;
				onSuccess();
			});
		},
		[factory, wallet.connectedAddress, onSuccess]
	);

	useEffect(() => {
		if (!wallet.provider) return;

		/**
		 * Reason for this method:
		 * https://github.com/ethers-io/ethers.js/discussions/1523
		 */
		wallet.provider.getBlockNumber().then((value) => {
			listenToNewTicketEvent(value);
		});
	}, [wallet.provider, listenToNewTicketEvent]);

	return (
		<Container>
			<div>
				<BarLoader />
				<div>Creating your ticket...</div>
			</div>
		</Container>
	);
}

const SuccessContainer = styled(Container)``;

export function CreateTicketSuccess() {
	return (
		<SuccessContainer>
			<div>
				Your ticket has been successfully created. Check out your new
				ticket in your collection.
			</div>
		</SuccessContainer>
	);
}
