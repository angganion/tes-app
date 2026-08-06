# Upgradeable Smart Contract for Real Estate Tokenization

## Research question

How can tokenized real-estate ownership support controlled upgrades while restricting transfers based on KYC verification status?

## Scope

The thesis studies the contract boundary between ownership, transfer eligibility, KYC state, and upgrade authority. The goal is to make the rules enforceable on-chain while keeping administrative power explicit and auditable.

## Design focus

- Transfer functions reject requests that do not satisfy the required KYC state.
- Upgrade authority is separated from ordinary asset transfers.
- State compatibility is treated as a first-class requirement for every upgrade.

## Status

This is an undergraduate thesis project at Universitas Indonesia. The current work focuses on the contract model, restriction rules, and the security implications of upgradeability.
