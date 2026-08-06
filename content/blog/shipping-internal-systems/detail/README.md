# Internal tools are still products

Asset management, legal requests, task workflows, and employee journeys may be internal, but their users still need a product that is predictable.

## Model the workflow first

The useful unit is not a screen. It is a state transition: who can submit, who can approve, what happens when an attachment changes, and which notification makes the next action obvious.

## Keep permissions close to the action

Authentication identifies a person. Authorization decides whether that person can perform this transition on this record. Keeping that distinction clear prevents accidental access.

## Document the failure path

Good documentation records the API shape, business flow, and failure modes. That makes handover faster and gives debugging a map when production gets noisy.
