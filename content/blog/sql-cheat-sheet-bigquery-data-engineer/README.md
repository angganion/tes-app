---
title: The BigQuery edition: SQL cheat sheet for data engineers
eyebrow: FIELD NOTE 08
date: 2026-08
readTime: 20 min read
---

# The BigQuery edition: SQL cheat sheet for data engineers

This is a BigQuery-native SQL cheat sheet for data engineers, written in
GoogleSQL. It starts where BigQuery actually starts — columnar storage, nested
and repeated data, byte-based billing — and covers the queries a data engineer
writes every day: safe casting, `UNNEST`, `QUALIFY`, dedup, `MERGE`,
partitioning and clustering, wildcard tables, and scripts.

Table names are shown as `dataset.table`; in real code they're backtick-quoted
and fully qualified: `` `project.dataset.table` ``.

## Query evaluation order

| # | Step | What happens |
| --- | --- | --- |
| 1 | `FROM` | Tables, joins, `UNNEST`, subqueries. Sets of rows are built first. |
| 2 | `WHERE` | Filters rows, before grouping and aggregation. |
| 3 | `GROUP BY` + aggregation | Groups rows and computes `SUM()`, `COUNT()`, etc. |
| 4 | `HAVING` | Filters the groups. `WHERE` already ran, too late for it. |
| 5 | `WINDOW` | Window functions are computed here, after grouping. |
| 6 | `QUALIFY` | Filters on a window result, so it can see `ROW_NUMBER()` output. |
| 7 | `DISTINCT` | Dedupes the surviving rows. |
| 8 | `ORDER BY` | Sorts, last real work before output. |
| 9 | `LIMIT` | Cuts the output. Does not reduce bytes billed, pruning already happened at step 2. |

- `WHERE` runs before `SELECT`, so it can't use a `SELECT` alias. `HAVING`, `QUALIFY`, and `ORDER BY` run after, so they can.

## Querying basics

| Clause | How to use | Explained |
| --- | --- | --- |
| SELECT | `SELECT 1 + 1 AS two;`
`SELECT CURRENT_DATE() AS today;`
`SELECT order_id, amount
FROM analytics.orders;` | Many expressions need no `FROM` at all — literals, `CURRENT_*()`, and even `UNION ALL` of two `SELECT`s. |
| SELECT * EXCEPT / REPLACE | `SELECT * EXCEPT (raw_payload)
FROM analytics.events;`
`SELECT * REPLACE (LOWER(email) AS email)
FROM analytics.users;` | Drop the wide payload column, or swap a column's value in place — cheaper AND safer than `SELECT *`. |
| WHERE | `SELECT *
FROM analytics.orders
WHERE status = 'PAID'
  AND amount >= 100;` | Filter rows. `WHERE` cannot reference `SELECT` aliases — `HAVING` and `ORDER BY` can. |
| ORDER BY | `SELECT order_id, amount
FROM analytics.orders
ORDER BY amount DESC NULLS LAST;` | Default null order is `NULLS FIRST` on `ASC`, `NULLS LAST` on `DESC`. Say it explicitly, always. |
| DISTINCT | `SELECT DISTINCT country
FROM analytics.users;` | Unique values. On big tables it hides the real problem — see dedup patterns. |
| LIMIT / OFFSET | `SELECT order_id
FROM analytics.orders
ORDER BY order_id
LIMIT 10 OFFSET 20;` | `LIMIT n OFFSET m` pages results. `LIMIT` does NOT cap bytes billed — you pay for what is scanned before the limit. |
| Keyset pagination | `SELECT order_id
FROM analytics.orders
WHERE order_id > 1000
ORDER BY order_id
LIMIT 10;` | Constant-time at any depth — the right pattern for big exports. |
| TABLESAMPLE | `SELECT *
FROM analytics.events
TABLESAMPLE SYSTEM (1 PERCENT);` | Sample rows for quick checks: `SYSTEM (n PERCENT)` or `BERNOULLI (n ROWS)`. |

## Casting and conditional expressions

| Clause | How to use | Explained |
| --- | --- | --- |
| CAST | `SELECT CAST('123' AS INT64) AS i,
       CAST('2026-01-15' AS DATE) AS d;` | Convert types. Fails at runtime on bad input. |
| SAFE_CAST | `SELECT SAFE_CAST('apple' AS INT64) AS a,
       SAFE_CAST('123' AS INT64) AS b;` | Same as `CAST`, but returns `NULL` instead of erroring — the data engineer's friend on dirty data. |
| IF | `SELECT IF(status = 'PAID', 'yes', 'no') AS paid
FROM analytics.orders;` | Inline two-way conditional — no `CASE` ceremony needed. |
| COALESCE | `SELECT order_id,
       COALESCE(coupon_code, 'none') AS coupon
FROM analytics.orders;` | First non-NULL value. `IFNULL(x, y)` is the two-argument shorthand. |
| NULLIF | `SELECT amount / NULLIF(qty, 0) AS unit_price
FROM analytics.order_lines;` | Turn a value into NULL — the divide-by-zero guard. |
| CASE | `SELECT order_id,
       CASE
         WHEN amount < 50 THEN 'budget'
         WHEN amount < 200 THEN 'mid'
         ELSE 'premium'
       END AS tier
FROM analytics.orders;` | Multi-way conditional, both as a column and inside aggregates. |
| PARSE_* | `SELECT PARSE_DATE('%Y%m%d', '20260816') AS d,
       PARSE_TIMESTAMP('%Y-%m-%d %H:%M', '2026-08-16 10:30') AS ts;` | Parse string formats that `CAST` can't handle. |
| FORMAT_DATE | `SELECT FORMAT_DATE('%b %d, %Y', order_date) AS label
FROM analytics.orders;` | The reverse — date to formatted string. `FORMAT_TIMESTAMP` works the same for timestamps. |

## Strings and regex

| Clause | How to use | Explained |
| --- | --- | --- |
| CONCAT | `SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM analytics.users;`
`SELECT first_name || ' ' || last_name
FROM analytics.users;` | `CONCAT` and `||` are interchangeable. Gotcha: `CONCAT` returns NULL if ANY argument is NULL. |
| SUBSTR | `SELECT SUBSTR(product, 1, 4) AS code
FROM analytics.catalog;` | 1-based substring. `SUBSTRING` is an alias. Negative start counts from the end. |
| LENGTH | `SELECT LENGTH(email) AS chars,
       BYTE_LENGTH(email) AS bytes
FROM analytics.users;` | `LENGTH(STRING)` counts characters; `BYTE_LENGTH` counts bytes. |
| SPLIT | `SELECT item
FROM analytics.posts,
     UNNEST(SPLIT(tags, ',')) AS item;` | Split into an ARRAY, then flatten with `UNNEST`. Needs a literal delimiter — use `REGEXP_EXTRACT_ALL` for regex splits. |
| LIKE | `SELECT *
FROM analytics.users
WHERE email LIKE '%@gmail.com';` | `%` and `_` wildcards, case-sensitive. `COLLATE(email, 'und:ci')` makes it case-insensitive. |
| REGEXP_CONTAINS | `SELECT *
FROM analytics.events
WHERE REGEXP_CONTAINS(user_agent, r'Chrome/[0-9]+');` | Regex partial match (RE2 syntax). |
| REGEXP_EXTRACT | `SELECT REGEXP_EXTRACT(email, r'^[^@]+') AS user
FROM analytics.users;` | First match or capture group. `REGEXP_EXTRACT_ALL` returns an ARRAY of every match. |
| REGEXP_REPLACE | `SELECT REGEXP_REPLACE(name, r'\s+', '_') AS slug
FROM analytics.users;` | Replace matches; backrefs `\1`..`\9` work. |
| STARTS_WITH / ENDS_WITH | `SELECT *
FROM analytics.logs
WHERE STARTS_WITH(path, '/api/v2');` | Prefix/suffix checks — cheaper to read than a regex. `STRPOS` and `CONTAINS_SUBSTR` cover substring search. |
| TRIM / REPLACE | `SELECT TRIM(display_name) AS name
FROM analytics.users;` | Strip whitespace; `REPLACE(x, 'a', 'b')` swaps substrings. |

## Arrays and STRUCTs

Nested and repeated data is first-class in BigQuery — an `ARRAY<STRUCT>` column
is a normal table shape, not a join away. This is the section most cheat sheets
skip:

| Clause | How to use | Explained |
| --- | --- | --- |
| Array literals | `SELECT [1, 2, 3] AS nums,
       ['a', 'b'] AS letters;` | `ARRAY<T>` of one element type. In table schemas, arrays are the "repeated" fields. |
| ARRAY_LENGTH | `SELECT ARRAY_LENGTH(items) AS n
FROM analytics.orders;` | Element count. |
| ARRAY_CONCAT | `SELECT ARRAY_CONCAT([1, 2], [3, 4]) AS nums;` | Merge arrays. `||` works on arrays too. |
| ARRAY_TO_STRING | `SELECT ARRAY_TO_STRING(['a', 'b'], ', ') AS s;` | The reverse of `SPLIT`. |
| STRUCT | `SELECT STRUCT('Alice' AS name, 30 AS age) AS person;`
`SELECT (1, 'one') AS pair;` | A record with named or positional fields — the "nested" part of nested fields. Access with a dot: `person.name`. |
| SELECT AS STRUCT | `SELECT AS STRUCT user_id, email
FROM analytics.users;` | Wrap selected columns into one STRUCT column. |
| UNNEST | `SELECT order_id, item
FROM analytics.orders,
     UNNEST(items) AS item;` | Flatten an array into one row per element — the bread and butter of event data. |
| LEFT JOIN UNNEST | `SELECT order_id, item
FROM analytics.orders
LEFT JOIN UNNEST(items) AS item;` | Keep the row even when the array is empty/NULL; the comma form drops it. |
| WITH OFFSET | `SELECT order_id, item, pos
FROM analytics.orders,
     UNNEST(items) AS item WITH OFFSET AS pos;` | Keep the element position while flattening. |
| IN UNNEST | `SELECT *
FROM analytics.orders
WHERE status IN UNNEST(['PAID', 'REFUNDED']);` | Filter against an array — cleaner than chained `OR`s. |
| GENERATE_ARRAY | `SELECT n
FROM UNNEST(GENERATE_ARRAY(1, 10, 2)) AS n;` | A number spine: 1, 3, 5, 7, 9. |

## JSON

BigQuery has a native `JSON` type. It stores actual JSON — no string gymnastics —
and you query it with JSONPath:

| Clause | How to use | Explained |
| --- | --- | --- |
| JSON_VALUE | `SELECT JSON_VALUE(payload, '$.user.email') AS email
FROM analytics.events;` | Extract a scalar (string/number) as a STRING. The daily-driver function. |
| JSON_QUERY | `SELECT JSON_QUERY(payload, '$.items') AS items
FROM analytics.events;` | Extract an object or array, kept as JSON. |
| JSON filtering | `SELECT *
FROM analytics.events
WHERE JSON_VALUE(payload, '$.status') = 'failed';` | Filter on a nested value. |
| JSON arrays | `SELECT item
FROM analytics.events,
     UNNEST(JSON_QUERY_ARRAY(payload, '$.items')) AS item;` | Flatten a JSON array into rows. `JSON_VALUE_ARRAY` does the same for scalars. |
| PARSE_JSON | `SELECT PARSE_JSON('{"a": 1, "b": [1, 2]}') AS obj;` | Build a `JSON` value from a string. |
| TO_JSON_STRING | `SELECT TO_JSON_STRING(STRUCT(1 AS a, 'x' AS b)) AS s;` | Serialize any value back to a JSON string. |

> When you `GROUP BY` or `ORDER BY` a JSON field, extract it first with
> `JSON_VALUE` — the `JSON` type itself can't be sorted or grouped directly.

## Dates and timestamps

Four time types, and confusing them is the #1 source of bugs:

| Type | Means | Literal |
| --- | --- | --- |
| DATE | calendar day, no time | `DATE '2026-08-16'` |
| DATETIME | wall-clock, no timezone | `DATETIME '2026-08-16 10:30:00'` |
| TIMESTAMP | absolute instant, UTC internally | `TIMESTAMP '2026-08-16 10:30:00+07'` |
| TIME | time of day | `TIME '10:30:00'` |

| Clause | How to use | Explained |
| --- | --- | --- |
| CURRENT_DATE | `SELECT CURRENT_DATE() AS today;`
`SELECT CURRENT_DATE('Asia/Jakarta') AS today_jkt;` | Today in UTC or any timezone. `CURRENT_TIMESTAMP()` is the instant now; `CURRENT_DATETIME()` is civil time. |
| DATE_ADD / DATE_SUB | `SELECT DATE_ADD(order_date, INTERVAL 7 DAY) AS due
FROM analytics.orders;`
`SELECT TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);` | Date arithmetic on any of the types (`DATE_ADD`, `DATETIME_ADD`, `TIMESTAMP_ADD`, `TIME_ADD` and `_SUB` twins). |
| DATE_TRUNC | `SELECT DATE_TRUNC(order_ts, MONTH) AS month,
       COUNT(*) AS orders
FROM analytics.orders
GROUP BY 1
ORDER BY 1;` | Round down to a period start. `TIMESTAMP_TRUNC(ts, DAY, 'Asia/Jakarta')` truncates in a specific timezone — critical for daily buckets that must follow WIB. |
| DATE_DIFF | `SELECT DATE_DIFF(CURRENT_DATE(), '2026-01-01', DAY) AS days;`
`SELECT TIMESTAMP_DIFF(ended_at, started_at, MINUTE) AS mins
FROM analytics.sessions;` | Argument order is `(end, start, part)` — the later value comes FIRST. `_DIFF` counts unit boundaries, not elapsed units. |
| EXTRACT | `SELECT EXTRACT(DAYOFWEEK FROM order_ts) AS dow,
       EXTRACT(HOUR FROM order_ts) AS hr
FROM analytics.orders;` | `DAYOFWEEK` is 1=Sunday..7=Saturday. Parts: `DAY`, `MONTH`, `YEAR`, `QUARTER`, `ISOWEEK`, `WEEK`, `HOUR`. |
| AT TIME ZONE | `SELECT order_ts AT TIME ZONE 'Asia/Jakarta' AS local_time
FROM analytics.orders;` | Display an instant in a zone. To build an instant from a wall-clock: `TIMESTAMP('2026-08-16 10:30:00', 'Asia/Jakarta')`. |
| LAST_DAY | `SELECT LAST_DAY(DATE '2026-08-16', MONTH) AS month_end;` | The last day of the month/quarter/year. |
| GENERATE_DATE_ARRAY | `SELECT day
FROM UNNEST(GENERATE_DATE_ARRAY(
  '2026-08-01', '2026-08-31', INTERVAL 1 DAY)) AS day;` | A date spine to fill gaps left by `GROUP BY`. `GENERATE_TIMESTAMP_ARRAY` does the same with timestamps. |

> Timezone note for Indonesia: WIB is UTC+7. Store `TIMESTAMP` (absolute),
> never a naive `DATETIME`, and truncate or display at the edge with
> `AT TIME ZONE 'Asia/Jakarta'`. If your daily aggregation must align to WIB
> days, `TIMESTAMP_TRUNC(ts, DAY, 'Asia/Jakarta')` is non-negotiable.

## Aggregation

| Clause | How to use | Explained |
| --- | --- | --- |
| COUNT / SUM / AVG | `SELECT COUNT(*) AS n,
       COUNT(DISTINCT user_id) AS users,
       SUM(amount) AS revenue,
       AVG(amount) AS avg_order
FROM analytics.orders;` | `COUNT(*)` includes NULLs; `COUNT(col)` skips them. `AVG(INT64)` returns FLOAT64. |
| COUNTIF | `SELECT
       COUNTIF(status = 'PAID') AS paid_orders
FROM analytics.orders;` | Conditional count without CASE. |
| SUM(IF) | `SELECT SUM(IF(status = 'PAID', amount, 0)) AS paid_total
FROM analytics.orders;` | Conditional sum — `IF` inside the aggregate. |
| GROUP BY / HAVING | `SELECT country,
       SUM(amount) AS revenue
FROM analytics.orders o
JOIN analytics.users u
  USING (user_id)
GROUP BY country
HAVING SUM(amount) > 1000;` | `HAVING` can reference `SELECT` aliases (unlike `WHERE`). |
| GROUP BY ALL | `SELECT country, status, COUNT(*) AS n
FROM analytics.orders
GROUP BY ALL;` | Group by every non-aggregated column automatically — no more copying the select list. |
| ROLLUP / CUBE | `SELECT country, status, COUNT(*) AS n
FROM analytics.orders
GROUP BY ROLLUP (country, status);` | Subtotal rows. `CUBE` does all combinations; `GROUPING SETS` picks specific ones. |
| STRING_AGG | `SELECT country,
       STRING_AGG(email, ', ' ORDER BY email) AS emails
FROM analytics.users
GROUP BY country;` | Concatenate a group into one string, optionally ordered. |
| ARRAY_AGG | `SELECT order_id,
       ARRAY_AGG(item_name ORDER BY line_no) AS items
FROM analytics.order_lines
GROUP BY order_id;` | Collect a group into an ARRAY. Without inner `ORDER BY` element order is arbitrary; add `IGNORE NULLS` to skip NULLs. |
| ANY_VALUE / MAX_BY | `SELECT user_id,
       ANY_VALUE(email) AS any_email,
       MAX_BY(email, created_at) AS latest_email
FROM analytics.users
GROUP BY user_id;` | Pick any value per group (`ANY_VALUE`), or the value that goes with the max/min of another column (`MAX_BY`/`MIN_BY`). |
| PERCENTILE_CONT | `SELECT PERCENTILE_CONT(amount, 0.5) OVER () AS median
FROM analytics.orders;` | The honest middle — plain `AVG` lies on skewed data. `PERCENTILE_CONT` is a window function in BigQuery. |
| APPROX_COUNT_DISTINCT | `SELECT
       APPROX_COUNT_DISTINCT(user_id) AS approx_users
FROM analytics.events;` | HLL-based estimate — far cheaper than exact `COUNT(DISTINCT)` on huge tables. Right for dashboards where ~1-2% error is fine. |
| APPROX_QUANTILES | `SELECT APPROX_QUANTILES(amount, 100)[OFFSET(90)] AS p90
FROM analytics.orders;` | Approximate percentiles in one pass — `[OFFSET(50)]` is the median. `APPROX_TOP_COUNT(col, 5)` gives top values. |

## Window functions and QUALIFY

The window functions you expect — `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`,
`LEAD`, `FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE`, `NTILE` — plus `QUALIFY`,
which filters on a window result without a subquery:

| Clause | How to use | Explained |
| --- | --- | --- |
| LAG / LEAD | `SELECT user_id, order_ts,
       LAG(order_ts) OVER (
         PARTITION BY user_id
         ORDER BY order_ts) AS prev_order
FROM analytics.orders;` | Read the previous/next row per group — row-to-row comparison without a self-join. |
| LAG for sessions | `SELECT user_id, event_ts,
       TIMESTAMP_DIFF(event_ts,
         LAG(event_ts) OVER (
           PARTITION BY user_id
           ORDER BY event_ts), MINUTE) AS gap_min
FROM analytics.events;` | Gap between consecutive events per user — the basis of session detection. |
| RANK / DENSE_RANK | `SELECT product_id, price,
       RANK() OVER (ORDER BY price DESC) AS rk,
       DENSE_RANK() OVER (ORDER BY price DESC) AS drk
FROM analytics.catalog;` | `RANK` leaves gaps on ties (1,1,3); `DENSE_RANK` does not (1,1,2). |
| ROW_NUMBER | `SELECT product_id, price,
       ROW_NUMBER() OVER (
         ORDER BY price DESC) AS rn
FROM analytics.catalog;` | Always-unique numbering — ties broken arbitrarily. The dedup workhorse. |
| TOP-N per group | `SELECT product_id, price, category
FROM analytics.catalog
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY category
  ORDER BY price DESC) <= 3;` | Top 3 per category, no subquery, no CTE. |
| DEDUP keep latest | `SELECT *
FROM analytics.customers_raw
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY customer_id
  ORDER BY updated_at DESC) = 1;` | The classic dedup pattern — probably the most-written query in data engineering. |
| DEDUP by aggregate | `SELECT customer_id,
       MAX(updated_at) AS last_seen
FROM analytics.customers_raw
GROUP BY customer_id;` | Collapse to aggregates instead of keeping a full row — cheaper, and fine when you only need a value or two. |
| WINDOW clause | `SELECT user_id, amount,
       SUM(amount) OVER w AS running,
       AVG(amount) OVER w AS avg_amt
FROM analytics.orders
WINDOW w AS (PARTITION BY user_id
             ORDER BY order_ts);` | Name a window once and reuse it in several `OVER` clauses. |

## Joins

| Clause | How to use | Explained |
| --- | --- | --- |
| INNER / LEFT / FULL | `SELECT o.order_id, u.email
FROM analytics.orders o
INNER JOIN analytics.users u
  ON o.user_id = u.user_id;`
`SELECT u.user_id, o.order_id
FROM analytics.users u
LEFT JOIN analytics.orders o
  ON u.user_id = o.user_id;` | Standard ANSI joins with `ON` or `USING`. BigQuery is columnar and distributed — joins are where most cost lives, so pre-filter both sides. |
| USING | `SELECT order_id, email
FROM analytics.orders
JOIN analytics.users
USING (user_id);` | Equi-join on a same-named column — the join key appears once in the result. |
| SELF JOIN | `SELECT e1.name AS employee,
       e2.name AS manager
FROM analytics.employees e1
LEFT JOIN analytics.employees e2
  ON e1.manager_id = e2.employee_id;` | A table joined to itself — hierarchies and org charts. |
| CROSS JOIN UNNEST | `SELECT order_id, item
FROM analytics.orders,
     UNNEST(items) AS item;` | The comma form is idiomatic — see the arrays section for the full set of `UNNEST` flavors. |

> Comma cross joins (`FROM a, b`) are legal — that's the idiomatic `UNNEST`
> form. For real joins, always write `JOIN ... ON` / `USING`; a comma cross
> join + `WHERE` filter is a bill waiting to happen.

## Tables, partitioning and clustering

BigQuery has no primary keys and no indexes. The schema that replaces them is
partitioning + clustering — and both exist for one reason: prune bytes before
you pay for them.

| Clause | How to use | Explained |
| --- | --- | --- |
| CREATE TABLE | `CREATE OR REPLACE TABLE analytics.events (
  event_id INT64,
  user_id INT64,
  event_ts TIMESTAMP,
  revenue NUMERIC,
  payload JSON
)
PARTITION BY DATE(event_ts)
CLUSTER BY user_id
OPTIONS (
  description = 'clickstream events',
  require_partition_filter = TRUE,
  partition_expiration_days = 400
);` | The canonical event-table schema. `NUMERIC` for money, `JSON` for payloads, partition by day, cluster by the join/filter key. |
| CTAS | `CREATE OR REPLACE TABLE analytics.sales_daily
PARTITION BY dt
CLUSTER BY customer_id
AS
SELECT DATE(order_ts) AS dt,
       customer_id,
       SUM(amount) AS total
FROM analytics.raw_orders
GROUP BY dt, customer_id;` | Create from a query — atomic overwrite. Partitioning/clustering are NOT inherited from the source; declare them explicitly. |
| Column partitioning | `CREATE TABLE analytics.events (
  event_id INT64,
  event_ts TIMESTAMP
)
PARTITION BY TIMESTAMP_TRUNC(event_ts, DAY);` | One partition per day (or `MONTH`/`YEAR`/`HOUR`). Filter the column in `WHERE` and BigQuery reads only matching partitions. |
| Ingestion-time partitioning | `CREATE TABLE analytics.logs (
  msg STRING
)
PARTITION BY _PARTITIONDATE
OPTIONS (partition_expiration_days = 90);` | Rows land in a partition by load date. `_PARTITIONDATE` / `_PARTITIONTIME` are pseudo-columns you filter on. |
| Integer-range partitioning | `CREATE TABLE analytics.orders (
  order_id INT64,
  customer_id INT64
)
PARTITION BY RANGE_BUCKET(
  customer_id, GENERATE_ARRAY(0, 1000000, 100000));` | Partition by numeric ranges — for non-time keys like customer id. |
| require_partition_filter | `CREATE TABLE analytics.events (
  event_id INT64
)
PARTITION BY DATE(event_ts)
OPTIONS (require_partition_filter = TRUE);` | Queries without a partition filter fail instead of scanning the whole table — the cheapest insurance policy in BigQuery. |
| Query pruning | `SELECT COUNT(*) AS n
FROM analytics.events
WHERE event_ts >= TIMESTAMP('2026-08-01')
  AND event_ts <  TIMESTAMP('2026-08-08');` | Keep the partition column bare. BigQuery prunes some wrapped forms (`DATE(ts)`, `TIMESTAMP_TRUNC`), but arithmetic on the column still forces a full scan. |
| Clustering | `CREATE TABLE analytics.events
PARTITION BY DATE(event_ts)
CLUSTER BY user_id, event_id;` | Sorts data within each partition, so a filter on `user_id` skips blocks. Up to 4 columns; most-filtered column first. |
| The combo | `SELECT user_id, SUM(revenue) AS revenue
FROM analytics.events
WHERE event_ts >= '2026-08-01'
  AND event_ts <  '2026-08-08'
  AND user_id = 123456
GROUP BY user_id;` | Partition prunes to the week, cluster prunes to the user. The canonical access pattern for big event tables. |
| VIEW / MATERIALIZED VIEW | `CREATE OR REPLACE VIEW analytics.v_big_customers AS
SELECT user_id, SUM(total) AS ltv
FROM analytics.sales_daily
GROUP BY user_id;`
`CREATE MATERIALIZED VIEW analytics.mv_sales_by_day AS
SELECT dt, COUNT(*) AS orders, SUM(total) AS revenue
FROM analytics.sales_daily
GROUP BY dt;` | A view is a saved query. A materialized view stores its result and auto-refreshes — but only supports a restricted subset of queries. |
| ALTER / DROP | `ALTER TABLE analytics.sales_daily
  ADD COLUMN IF NOT EXISTS region STRING;`
`ALTER TABLE analytics.sales_daily
  RENAME COLUMN total TO amount;`
`DROP TABLE analytics.sales_daily;` | Column ops are metadata-only and cheap. |

> Partition by day, cluster by a high-cardinality dimension. Keep under the
> 10,000-partition table limit — daily partitioning blows past it after ~27
> years, so switch to monthly. Prefer one big partitioned table over hundreds
> of `events_20260801` sharded tables.

## Writing data: DML

| Clause | How to use | Explained |
| --- | --- | --- |
| INSERT | `INSERT INTO analytics.sales_daily
  (dt, user_id, total)
SELECT DATE(order_ts), user_id, SUM(amount)
FROM analytics.raw_orders
GROUP BY 1, 2;` | The standard load move — insert the result of a query. `INSERT ... VALUES` only works inside a script. |
| UPDATE | `UPDATE analytics.sales_daily
SET region = 'EMEA'
WHERE user_id IN (SELECT user_id
  FROM analytics.customers
  WHERE region = 'EMEA');` | Always with a `WHERE` — BigQuery requires it, which is a feature, not a footnote. |
| DELETE | `DELETE FROM analytics.sales_daily
WHERE dt < DATE '2023-01-01';` | Same — `WHERE` is mandatory. |
| MERGE | `MERGE analytics.customers t
USING analytics.stage_customers s
  ON t.customer_id = s.customer_id
WHEN MATCHED AND s.is_deleted THEN
  DELETE
WHEN MATCHED THEN
  UPDATE SET t.email = s.email,
             t.updated_at = CURRENT_TIMESTAMP()
WHEN NOT MATCHED THEN
  INSERT (customer_id, email)
  VALUES (s.customer_id, s.email);` | The upsert — deletes first, then updates, then inserts. Clause order matters. |

## Wildcard tables and INFORMATION_SCHEMA

| Clause | How to use | Explained |
| --- | --- | --- |
| Wildcard tables | `SELECT _TABLE_SUFFIX AS day, COUNT(*) AS n
FROM analytics.events_*
WHERE _TABLE_SUFFIX BETWEEN '20260801' AND '20260807'
  AND event_type = 'click'
GROUP BY day;` | Query many tables at once. `_TABLE_SUFFIX` is a STRING pseudo-column — always filter it with a constant expression so only matching tables are scanned. |
| Table metadata | `SELECT table_name, row_count, size_bytes
FROM analytics.INFORMATION_SCHEMA.TABLES
WHERE table_name LIKE 'events_%';` | List tables and sizes in a dataset. |
| Column metadata | `SELECT column_name, data_type
FROM analytics.INFORMATION_SCHEMA.COLUMNS
WHERE table_name = 'events';` | The schema, programmatically — great for generating code or docs. |
| Partition metadata | `SELECT partition_id, total_rows,
       total_logical_bytes
FROM analytics.INFORMATION_SCHEMA.PARTITIONS
WHERE table_name = 'events';` | Per-partition sizes — spot the partition that never gets pruned. |
| Job metadata | `SELECT job_id, user_email, query,
       total_bytes_billed
FROM region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE job_type = 'QUERY'
  AND creation_time >= TIMESTAMP_SUB(
        CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
ORDER BY total_bytes_billed DESC
LIMIT 20;` | Your cost audit — the top billers this week. `JOBS` / `JOBS_BY_PROJECT` keeps 180 days of history. |

## Scripts

| Clause | How to use | Explained |
| --- | --- | --- |
| DECLARE / SET | `DECLARE start_date DATE
  DEFAULT '2026-08-01';
DECLARE end_date DATE DEFAULT '2026-08-31';
SET end_date = DATE '2026-08-15';` | Variables for multi-statement scripts. `DECLARE` goes at the top of the block. |
| CREATE TEMP TABLE | `CREATE TEMP TABLE tmp_orders AS
SELECT *
FROM analytics.orders
WHERE order_ts >= '2026-08-01';` | Lives for the script session — the scratchpad for multi-step transformations. |
| BEGIN / END | `BEGIN
  INSERT INTO analytics.audit
    (ran_at, table_name)
  VALUES (CURRENT_TIMESTAMP(), 'orders');
END;` | Group statements into a block. |
| FOR loop | `FOR day IN (
  SELECT d FROM UNNEST(GENERATE_DATE_ARRAY(
    '2026-08-01', '2026-08-07')) AS d
) DO
  EXECUTE IMMEDIATE
    FORMAT('SELECT * FROM %s WHERE day = "%s"',
           'events_daily', day.d);
END FOR;` | Loop over generated dates; dynamic identifiers need `EXECUTE IMMEDIATE` + `FORMAT`. `WHILE` and `LOOP` also exist. |

## Cost: bytes scanned is your budget

In BigQuery you are billed per byte scanned, so query shape is your budget.
This is the section that matters most:

| Clause | How to use | Explained |
| --- | --- | --- |
| Pricing | — | On-demand is **$6.25 per TiB scanned** (after a 1 TiB/month free tier). Capacity/editions model buys slots instead. Cached results are free; wildcard queries are never cached. |
| Billing granularity | `SELECT event_id, user_id, revenue
FROM analytics.events
WHERE event_ts >= '2026-08-01';` | You are billed for every column you reference, rounded up to 10 MB per table. `SELECT *` on a wide table is the most expensive mistake in this post. |
| Dry run | `bq query --use_legacy_sql=false --dry_run 'SELECT * FROM analytics.events'` | Shows "will process N bytes" without running. Do this before any scary query. |
| Max bytes guard | `bq query --maximum_bytes_billed=10000000 --use_legacy_sql=false 'SELECT ...'` | Hard cap per query — over it, the query fails instead of billing. |
| Query plan | — | There is no `EXPLAIN` statement. Read the **Execution details → Execution graph** tab in the console, or pull `statistics.query.queryPlan` from the Jobs API. Look for stages where output rows far exceed input rows (row explosion) or `shuffleOutputBytesSpilled > 0` (data hit disk). |
| Materialize in stages | `CREATE OR REPLACE TABLE analytics.daily_user_agg
PARTITION BY day
CLUSTER BY user_id AS
SELECT DATE(event_ts) AS day, user_id,
       SUM(revenue) AS revenue
FROM analytics.events
WHERE event_ts >= TIMESTAMP_SUB(
      CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
GROUP BY 1, 2;` | Don't let every dashboard re-run the same giant transformation. Build the aggregate once, then let reports query the small table. |

> In the console, the query validator tells you "This query will process X" —
> always glance at it before hitting Run. The day you skip it and scan 2 TB by
> accident is the day this section becomes your whole personality.

## Engine quick reference

`bq` command-line tools:

```text
bq query --use_legacy_sql=false 'SELECT 1'   -- run SQL
bq query --dry_run 'SELECT ...'              -- estimate bytes (free)
bq load --source_format=PARQUET dataset.table gs://bucket/file.parquet
bq mk --table dataset.table schema.json      -- create a table
bq show dataset.table                        -- describe a table
bq ls                                       -- list datasets/tables
```

## Common mistakes in production BigQuery

- `SELECT *` everywhere — bills every column, including payload columns you don't need. `SELECT * EXCEPT (...)` is the middle ground.
- **No partition filter** — a query without one scans the whole table. Turn on `require_partition_filter` and never look back.
- **Arithmetic on the partition column** — `event_ts + INTERVAL 1 DAY > ...` defeats pruning. Move the arithmetic to the other side.
- **Wildcard tables without `_TABLE_SUFFIX`** — unioning every matching table, billed every single run (never cached).
- **`OR` chains instead of `IN UNNEST`** — `OR` defeats both partition and cluster pruning.
- **Unnesting then re-aggregating** — flattening `ARRAY<STRUCT>` and `GROUP BY`-ing it back reintroduces shuffle. Keep nested data nested when you can.
- **`GROUP BY` on a `JSON` column** — extract with `JSON_VALUE` first.
- **Joining un-filtered sides** — BigQuery is columnar and distributed; join the smallest possible row sets.

