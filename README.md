# nft-ticketing-frontend

## Website structure / routing

                                                   ┌─────┐
                                                   │ APP │
                                                   └──┬──┘
                                                      │
                 ┌────────────────────┬───────────────┼──────────────┬─────────────────┐
                 │                    │               │              │                 │
             ┌───▼───┐         ┌──────▼──────┐    ┌───▼───┐    ┌─────▼─────┐    ┌──────▼──────┐
             │TICKET │         │CREATE TICKET│    │ HOME  │    │YOUR TICKET│    │SEARCH TICKET│
             └───┬───┘         └─────────────┘    └───────┘    └───────────┘    └─────────────┘
                 │
         ┌───────┴────────┐
         │                │
    ┌────▼────┐     ┌─────▼─────┐
    │DASHBOARD│     │MARKETPLACE│
    └─────────┘     └───────────┘

## Design

[Figma](https://www.figma.com/file/g20Hca6OrQMd4erG5HqNqq/ticket-platform?node-id=0%3A1)
