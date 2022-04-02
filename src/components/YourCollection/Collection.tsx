import Link from "next/link";
import styled, { css } from "styled-components";

import OpenLinkSVG from "../../assets/svg/open-link.svg";

const OpenLinkIcon = styled(OpenLinkSVG)``;

const Item = styled.div`
	${({ theme }) => css`
		padding: 1rem;
		margin-bottom: 0.5rem;
		border-radius: ${theme.rounded.sm};
		border: 1px solid ${theme.colors.grey.dark};
		background-color: ${theme.colors.grey.light};

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;

		.ticket-id-text {
			width: 50%;
			margin-top: 5px;
			overflow: hidden;
			font-size: 0.9rem;
			text-align: center;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.ticket-item-btn-wrapper {
			display: flex;
		}

		.ticket-item-btn {
			display: flex;
			align-items: center;

			cursor: pointer;
			font-weight: 600;
			font-size: 0.75rem;
			padding: 0.5em 0.8em;
			border-radius: ${theme.rounded.md};
			background-color: ${theme.colors.grey.dark};

			span {
				margin-right: 10px;
			}
		}

		.ticket-item-btn--page {
			margin-right: 10px;
			color: ${theme.colors.white};
			background-color: ${theme.colors.primary.light};
		}

		.ticket-item-btn--dashboard {
			color: ${theme.colors.primary.light};
			background-color: white;
			border: 1px solid ${theme.colors.primary.light};
		}
	`}
`;

interface ITicketItemProps {
	address: string;
}

const TicketItem = ({ address }: ITicketItemProps) => (
	<Item>
		<div>
			Ticket <div className="ticket-id-text">{address}</div>
		</div>

		<div className="ticket-item-btn-wrapper">
			<Link passHref href={`/ticket/${address}`}>
				<div className="ticket-item-btn ticket-item-btn--page">
					<span>Main page</span>
					<OpenLinkIcon />
				</div>
			</Link>

			<Link passHref href={`/ticket/${address}/dashboard`}>
				<div className="ticket-item-btn ticket-item-btn--dashboard">
					<span>Dashboard</span>
					<OpenLinkIcon />
				</div>
			</Link>
		</div>
	</Item>
);

interface ICollectionProps {
	tickets: string[];
}

export function Collection({ tickets }: ICollectionProps) {
	return (
		<>
			{tickets.map((address) => (
				<TicketItem address={address} key={`ticket_id_${address}`} />
			))}
		</>
	);
}
