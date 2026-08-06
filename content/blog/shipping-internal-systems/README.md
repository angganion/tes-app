---
title: Internal tools are still products
eyebrow: FIELD NOTE 03
date: 2026-01
readTime: 4 min read
---

# Internal tools are still products

Asset management, legal requests, task workflows, and employee journeys may be internal, but the people using them still need a product that is predictable.

## Model the workflow first

The useful unit is not a screen. It is the state transition: who can submit, who can approve, what happens when an attachment changes, and which notification makes the next action obvious.

## Keep permissions close to the action

Authentication identifies a person. Authorization decides whether that person can perform this transition on this record. Keeping that distinction clear prevents a surprising amount of accidental access.

## Document the path that breaks

Good documentation records the API shape, the business flow, and the failure modes. That makes handover faster and gives debugging a map when production gets noisy.
