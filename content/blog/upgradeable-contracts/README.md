---
title: Upgradeability needs a boundary
eyebrow: FIELD NOTE 01
date: 2026-02
readTime: 4 min read
---

# Upgradeability needs a boundary

Upgradeable smart contracts are useful when the rules of a system are still being tested. They also create a second problem: who is allowed to change the rules later?

## Start with the authority model

Before writing the upgrade path, write down the actors. A clean model distinguishes the party that can upgrade code, the party that can verify KYC status, and the party that can transfer an asset. If one key can do all three, the system is easy to operate and hard to trust.

## Make the safe path the easy path

The contract should reject a transfer when the required KYC state is missing. The frontend can explain why, but the rule must live at the boundary that actually moves value.

## Keep the escape hatch visible

An upgrade mechanism is part of the product, not an implementation detail. Log upgrades, limit who can trigger them, and document what state must remain compatible. The goal is not to pretend a contract never changes; it is to make every change legible.
