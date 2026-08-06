---
title: The best database lesson is a slow query
eyebrow: FIELD NOTE 02
date: 2025-06
readTime: 3 min read
---

# The best database lesson is a slow query

When supporting hundreds of students in database labs, the most useful explanation is rarely a definition. It is the moment a query takes too long and the schema shows why.

## Measure before changing

Start with the query plan and the actual data shape. An index can help one access pattern while making writes more expensive. A normalized schema can preserve correctness while requiring a deliberate join strategy.

## Teach the trade-off

Raw SQL is not automatically better than an ORM. It becomes useful when the query is complex, the generated SQL is unclear, or the measured path needs a focused optimization. The habit worth keeping is the loop: inspect, change one thing, measure again.

## Leave a trail

The final answer should include the reason for the index, the expected access pattern, and the query it improves. Future maintainers should not have to rediscover the experiment from scratch.
