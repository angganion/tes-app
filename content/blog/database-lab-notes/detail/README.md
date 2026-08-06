# The best database lesson is a slow query

When supporting students in database labs, the most useful explanation is often the moment a query takes too long and the schema shows why.

## Measure before changing

Start with the query plan and actual data shape. An index can help one access pattern while making writes more expensive. A normalized schema can protect correctness while requiring a deliberate join strategy.

## Teach the trade-off

Raw SQL is not automatically better than an ORM. It becomes useful when the query is complex, generated SQL is unclear, or a measured path needs a focused optimization. The durable habit is: inspect, change one thing, measure again.

## Leave a trail

Document why an index exists, which access pattern it serves, and which query it improves. Future maintainers should not have to rediscover the experiment.
