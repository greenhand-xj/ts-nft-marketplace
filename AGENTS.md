# AGENTS.md

Quick facts specific to this repo that an agent would likely miss:

## Running the App

Three processes must run in parallel:

```bash
pnpm anvil              # Local Ethereum node (loads marketplace-anvil.json state)
pnpm indexer            # rindexer (cd marketplaceIndexer && rindexer start all)
pnpm run dev            # Next.js app
```

## Testing

- **Frontend**: `pnpm test:unit` (vitest)
- **E2E**: `pnpm test:e2e` (playwright)
- **Smart contracts**: `cd foundry && forge test`

## Key Addresses (anvil-loaded)

- USDC: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- NFT Marketplace: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- CakeNFT: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
- MoodNFT: `0xCf7Ed3AccA5a467e9e704C703E8D87f634fB0Fc9`

## Test Accounts (Metamask-importable)

- Account 0: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Account 9: `0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6`

## Important Files

- `package.json` - npm scripts in root
- `foundry/foundry.toml` - Foundry config (not root!)
- `foundry/test/*.t.sol` - Solidity tests

## Reset Indexer

```bash
pnpm run reset-indexer
```