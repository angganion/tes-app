# Upgradeability needs a boundary

Upgradeable smart contracts are useful while a system's rules are still being tested, but an upgrade path adds a second trust question: who can change those rules later?

## Model authority before implementation

Separate the party that can upgrade code, the party that can verify KYC status, and the party that can transfer an asset. When one key controls every operation, the system may be easy to operate but becomes difficult to trust.

## Put the safe path at the boundary

The contract should reject a transfer when its KYC requirement is not satisfied. A frontend can explain the reason, but the rule must live where value actually moves.

## Make change visible

An upgrade mechanism is part of the product. Log upgrades, restrict who can trigger them, and document which state must stay compatible. The objective is not to pretend a contract never changes; it is to make each change legible.
