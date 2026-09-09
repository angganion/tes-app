---
title: A SQL cheat sheet for data engineers
eyebrow: FIELD NOTE 07
date: 2026-08
readTime: 18 min read
---

# A SQL cheat sheet for data engineers

This post is a working SQL cheat sheet for data engineering. It started from the
Dataquest SQL cheat sheet (the Classic Models car-sales database: `products`,
`orders`, `customers`, `employees`, `offices`, `orderdetails`, `productlines`,
`payments`) and grew from there, because the original is analyst-shaped. It stops
at window functions and misses most of what a data engineer actually writes every
day: `LAG`/`LEAD`, upserts, deduplication, date arithmetic, JSON, query plans, and
indexes.

Everything here is PostgreSQL-flavored. The BigQuery, Snowflake, and DuckDB
differences that matter are called out where they exist. If a query says
`orders`, `customers`, or `products`, it refers to the Classic Models schema.

## Query evaluation order

| # | Step | What happens |
| --- | --- | --- |
| 1 | `FROM` | Tables, joins, `UNNEST`/`LATERAL`, subqueries. Sets of rows are built first. |
| 2 | `WHERE` | Filters rows, before grouping and aggregation. |
| 3 | `GROUP BY` + aggregation | Groups rows and computes `SUM()`, `COUNT()`, etc. |
| 4 | `HAVING` | Filters the groups. `WHERE` already ran, too late for it. |
| 5 | Window functions | `OVER ()` is computed here, after grouping. |
| 6 | `DISTINCT` | Dedupes the surviving rows. |
| 7 | `ORDER BY` | Sorts, last real work before output. |
| 8 | `LIMIT` / `FETCH FIRST` | Cuts the output. The scan already happened, so it does not reduce I/O. |

- `WHERE` runs before `SELECT`, so it can't use a `SELECT` alias. `HAVING`, `GROUP BY`, and `ORDER BY` run after, so they can.
- `QUALIFY` (BigQuery, Snowflake, DuckDB) runs between window functions and `DISTINCT`.

## Querying basics

| Clause | How to use | Explained |
| --- | --- | --- |
| SELECT | `SELECT *
FROM products;`
`SELECT productName,
       buyPrice
FROM products;` | Display all columns from the `products` table, or pick just the columns you need. |
| ORDER BY | `SELECT productName,
       buyPrice
FROM products
ORDER BY buyPrice DESC;` | Sort the selected rows. `ASC` is the default; add multiple columns to sort within groups. |
| DISTINCT | `SELECT DISTINCT productLine
FROM products;` | Retrieve unique values. Use sparingly on big tables — it hides the real problem (see dedup patterns). |
| LIMIT | `SELECT *
FROM products
LIMIT 10;` | Cap how many rows come back. |
| OFFSET | `SELECT *
FROM orders
ORDER BY orderNumber
LIMIT 50 OFFSET 200;` | Paginate. Fine for small pages, bad deep into a table — see keyset pagination. |

## Filtering and conditions

| Clause | How to use | Explained |
| --- | --- | --- |
| WHERE | `SELECT *
FROM products
WHERE buyPrice > 100;` | Filter rows with comparisons, `IN`, and `BETWEEN`. |
| LIKE / ILIKE | `SELECT *
FROM employees
WHERE lastName LIKE 'Sm%';`
`SELECT *
FROM customers
WHERE city ILIKE '%jakarta%';` | Pattern matching. `LIKE` is case-sensitive, `ILIKE` is not (PostgreSQL). `~` gives you full regex. |
| NULL handling | `SELECT *
FROM employees
WHERE reportsTo IS NULL;` | NULL is not a value, it is a missing value. `=` never matches NULL — use `IS NULL` / `IS DISTINCT FROM`. |
| NULLIF | `SELECT amount / NULLIF(quantity, 0)
       AS unit_price
FROM orderdetails;` | Turn a value into NULL — the classic guard against divide-by-zero. |
| COALESCE | `SELECT productName,
       COALESCE(productDescription,
                'No description available')
       AS description
FROM products;` | Returns the first non-NULL value. The Swiss-army knife for filling gaps. |
| CASE | `SELECT productName,
       CASE
       WHEN buyPrice < 50 THEN 'Budget'
       WHEN buyPrice BETWEEN 50 AND 100
         THEN 'Mid-range'
       ELSE 'Premium'
       END AS price_category
FROM products;` | Categorize values into buckets. The workhorse of conditional logic, both as a column and inside aggregates. |
| CAST | `SELECT orderDate::date AS order_day
FROM orders;`
`SELECT CAST(orderDate AS DATE) AS order_day
FROM orders;` | Convert types. PostgreSQL uses `::`, the rest of the SQL world uses `CAST`. |

## Aggregation

| Clause | How to use | Explained |
| --- | --- | --- |
| SUM / AVG | `SELECT SUM(quantityOrdered * priceEach)
       AS total_sales
FROM orderdetails;` | Calculate totals and averages. `ROUND(AVG(buyPrice), 2)` rounds the result. |
| MIN / MAX | `SELECT MIN(buyPrice) AS cheapest,
       MAX(buyPrice) AS most_expensive
FROM products;` | Find the smallest and largest values in a column. |
| COUNT | `SELECT COUNT(*) AS total_orders
FROM orders;` | Count rows. `COUNT(*)` includes NULLs, `COUNT(col)` skips them, `COUNT(DISTINCT col)` counts unique values. |
| GROUP BY | `SELECT productLine,
       AVG(buyPrice) AS avg_price
FROM products
GROUP BY productLine;` | Group rows by a column and calculate aggregates for each group. |
| HAVING | `SELECT productLine,
       AVG(buyPrice) AS avg_price
FROM products
GROUP BY productLine
HAVING AVG(buyPrice) > 50;` | Filter groups — `WHERE` filters rows first, `HAVING` filters groups after. |
| FILTER | `SELECT officeCode,
       COUNT(*) FILTER (
         WHERE jobTitle = 'Sales Rep'
       ) AS sales_reps
FROM employees
GROUP BY officeCode;` | Conditional aggregation without CASE — the clean way to count/avg a subset inside a group. |
| STRING_AGG | `SELECT productLine,
       STRING_AGG(productName, ', '
         ORDER BY productName) AS products
FROM products
GROUP BY productLine;` | Concatenate a group into one string. BigQuery calls it `STRING_AGG`, MySQL `GROUP_CONCAT`. |
| PERCENTILE_CONT | `SELECT PERCENTILE_CONT(0.5)
       WITHIN GROUP (ORDER BY buyPrice) AS median_price
FROM products;` | The median (and any percentile). Plain AVG can lie on skewed data — this is the honest middle. |
| ROLLUP | `SELECT productLine,
       COUNT(*) AS n
FROM products
GROUP BY ROLLUP (productLine);` | Subtotal rows. `CUBE` does all combinations, `GROUPING SETS` picks specific ones. |

## String and date functions

| Clause | How to use | Explained |
| --- | --- | --- |
| UPPER / LOWER | `SELECT UPPER(productName)
FROM products;` | Convert column values to uppercase or lowercase. |
| LENGTH | `SELECT LENGTH(productName) AS name_len
FROM products;` | Character length of a value. Careful: MySQL `LENGTH()` returns bytes, not characters. |
| SUBSTR | `SELECT SUBSTR(productLine, 1, 3) AS category
FROM products;` | Extract a substring from the beginning, end, or any position. MySQL/SQL Server use `SUBSTRING`. |
| CONCAT | `SELECT firstName || ' ' || lastName
       AS full_name
FROM employees;` | Concatenate with `||` in PostgreSQL/DuckDB/SQLite/BigQuery. MySQL uses `CONCAT()` instead. |
| SPLIT_PART | `SELECT SPLIT_PART('john.doe@mail.com', '@', 1)
       AS username;` | Split a string on a delimiter and take part N. |
| TRIM | `SELECT TRIM(BOTH ' ' FROM '  padded  ');` | Strip leading/trailing characters. |
| DATE_TRUNC | `SELECT DATE_TRUNC('month', orderDate) AS month,
       COUNT(*) AS orders
FROM orders
GROUP BY 1
ORDER BY 1;` | Round a timestamp down to a period start — daily bread for pipeline aggregations. |
| EXTRACT | `SELECT EXTRACT(YEAR FROM orderDate) AS year,
       EXTRACT(DOW FROM orderDate) AS day_of_week
FROM orders;` | Pull a part out of a date. |
| INTERVAL | `SELECT orderDate,
       orderDate + INTERVAL '7 days' AS due
FROM orders;` | Date arithmetic. `EXTRACT(EPOCH FROM a - b)` gives the difference in seconds. |
| generate_series | `SELECT generate_series(
         '2026-01-01'::date,
         '2026-01-31'::date,
         '1 day'
       ) AS day;` | A date spine — fills the gaps that `GROUP BY` alone leaves empty. |

> Timezone note for Indonesia: WIB is UTC+7. Store `timestamptz`, never naive
> `timestamp` without a timezone, and convert at the edge:
> `SELECT created_at AT TIME ZONE 'Asia/Jakarta' AS local_time FROM events;`

## Joins

| Clause | How to use | Explained |
| --- | --- | --- |
| INNER JOIN | `SELECT o.orderNumber, o.orderDate,
       c.customerName
FROM orders AS o
INNER JOIN customers AS c
    ON o.customerNumber = c.customerNumber;` | Only matching rows. This is the default join type when `JOIN` is used without a direction. |
| LEFT JOIN | `SELECT p.productCode, p.productName,
       od.orderNumber
FROM products AS p
LEFT JOIN orderdetails AS od
    ON p.productCode = od.productCode;` | All rows from the left table, NULLs where no match. The workhorse join. |
| FULL OUTER JOIN | `SELECT *
FROM employees e
FULL OUTER JOIN offices o
    ON e.officeCode = o.officeCode;` | All rows from both sides. |
| SELF JOIN | `SELECT e1.firstName AS employee,
       e2.firstName AS manager
FROM employees e1
LEFT JOIN employees e2
    ON e1.reportsTo = e2.employeeNumber;` | A table joined to itself — employees and their managers, hierarchies, matching pairs. |
| MULTIPLE JOINS | `SELECT o.orderNumber,
       c.customerName,
       p.productName
FROM orders o
JOIN customers c
    ON o.customerNumber = c.customerNumber
JOIN orderdetails od
    ON o.orderNumber = od.orderNumber
JOIN products p
    ON od.productCode = p.productCode;` | Chain joins to walk across four tables: orders → customers, orderdetails, products. |
| CROSS JOIN | `SELECT p.productName, pl.productLine
FROM products p
CROSS JOIN productlines pl;` | Every combination (cartesian product). Be careful — row counts multiply. |

> You will rarely need `RIGHT JOIN`: rewriting it as a `LEFT JOIN` with the
> tables swapped is clearer.

## Set operations

| Clause | How to use | Explained |
| --- | --- | --- |
| UNION ALL | `SELECT productName
FROM products
WHERE productLine = 'Classic Cars'
UNION ALL
SELECT productName
FROM products
WHERE productLine = 'Vintage Cars';` | Combine two result sets without deduplication. Prefer this over `UNION` unless you need dedup — it skips the sort. |
| UNION | same shape as `UNION ALL` | Combine result sets and remove duplicates. |
| EXCEPT | `SELECT productCode, productName
FROM products
EXCEPT
SELECT productCode, productName
FROM products
WHERE productLine = 'Classic Cars';` | Rows in the first result not in the second. Not in MySQL < 8.0.31. |
| INTERSECT | `SELECT customerNumber
FROM customers
WHERE country = 'USA'
INTERSECT
SELECT customerNumber
FROM customers
WHERE creditLimit > 100000;` | Rows that appear in both results. |
| ANTI JOIN | `SELECT p.*
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM orderdetails od
    WHERE od.productCode = p.productCode
);` | For set difference in production, `NOT EXISTS` is usually clearer and faster than `EXCEPT` — and it does not deduplicate rows. |

## Subqueries and CTEs

| Clause | How to use | Explained |
| --- | --- | --- |
| Subquery in SELECT | `SELECT productName,
       buyPrice,
       (SELECT AVG(buyPrice) FROM products) AS overall_avg
FROM products;` | A subquery that computes a scalar shown on every row — the overall average next to each product. |
| Subquery in FROM | `SELECT productLine, avg_price
FROM (
    SELECT productLine,
       AVG(buyPrice) AS avg_price
    FROM products
    GROUP BY productLine
) AS line_averages
WHERE avg_price > 100;` | Filter on an aggregated result. In practice you will usually write this as a CTE. |
| Subquery in WHERE (IN) | `SELECT productName
FROM products
WHERE productCode IN (
    SELECT productCode
    FROM orderdetails
    WHERE orderNumber = 10100
);` | Find products that were ordered in order 10100. |
| Correlated subquery | `SELECT productName, buyPrice
FROM products p1
WHERE p1.buyPrice > (
    SELECT AVG(p2.buyPrice)
    FROM products p2
    WHERE p1.productLine = p2.productLine
);` | A subquery that references the outer query — products above their own product line's average. |
| EXISTS | `SELECT customerName
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customerNumber = c.customerNumber
      AND o.orderDate >= '2023-01-01'
);` | Does a matching row exist? Customers who placed an order on or after Jan 1, 2023. |
| CTE (WITH) | `WITH order_totals AS (
    SELECT orderNumber,
       SUM(quantityOrdered * priceEach) AS total_amount
    FROM orderdetails
    GROUP BY orderNumber
)
SELECT o.orderNumber, o.orderDate,
       ot.total_amount
FROM orders o
JOIN order_totals ot
    ON o.orderNumber = ot.orderNumber
ORDER BY ot.total_amount DESC;` | The modern, readable way to structure multi-step queries. Use CTEs instead of nested subqueries when the logic has more than one step. |
| CTE MATERIALIZED | `WITH heavy AS MATERIALIZED (
    SELECT ... expensive aggregation ...
)
SELECT ...
FROM heavy a
JOIN heavy b ON ...;` | Hint the planner to materialize a CTE that is read multiple times (PostgreSQL 12+). |
| RECURSIVE CTE | `WITH RECURSIVE managers AS (
    SELECT employeeNumber, reportsTo, 0 AS depth
    FROM employees
    WHERE jobTitle = 'President'
    UNION ALL
    SELECT e.employeeNumber, e.reportsTo,
       m.depth + 1
    FROM employees e
    JOIN managers m
      ON e.reportsTo = m.employeeNumber
)
SELECT * FROM managers;` | Walk hierarchies — org charts, category trees, graph-ish walks. |

## Window functions

A window function computes over a set of rows related to the current row, without
collapsing them like `GROUP BY` does.

| Clause | How to use | Explained |
| --- | --- | --- |
| PARTITION BY | `SELECT employeeNumber, officeCode,
       AVG(LENGTH(extension)) OVER (
       PARTITION BY officeCode
       ) AS avg_ext_len
FROM employees;` | Divide rows into partitions, then compute within each — the average extension length per office, shown on every row. |
| ORDER BY in window | `SELECT employeeNumber, officeCode,
       SUM(LENGTH(extension)) OVER (
       PARTITION BY officeCode
       ORDER BY LENGTH(extension) DESC
       ) AS running_total
FROM employees;` | Order rows within the window — turns the aggregate into a running total. |
| ROWS BETWEEN | `SELECT day, amount,
       SUM(amount) OVER (
       ORDER BY day
       ROWS BETWEEN UNBOUNDED PRECEDING
         AND CURRENT ROW
       ) AS running_total
FROM daily_sales;` | The frame: exactly which rows the window sees. `ROWS` counts rows; the default `RANGE` treats ties as peers. |
| Moving average | `SELECT day, amount,
       AVG(amount) OVER (
       ORDER BY day
       ROWS BETWEEN 6 PRECEDING
         AND CURRENT ROW
       ) AS ma7
FROM daily_sales;` | A 7-day moving average — 6 previous rows + current. |
| LAG / LEAD | `SELECT orderDate, amount,
       amount - LAG(amount) OVER (
       ORDER BY orderDate
       ) AS delta,
       amount - LEAD(amount) OVER (
       ORDER BY orderDate
       ) AS next_delta
FROM daily_sales;` | Read the previous or next row — row-to-row comparison without a self-join. The biggest gap in the original cheat sheet. |
| LAG for YoY | `SELECT month, revenue,
       LAG(revenue, 12) OVER (
       ORDER BY month
       ) AS revenue_lastyear
FROM monthly_sales;` | Period-over-period — compare to the same row 12 months earlier. |
| LAG for sessions | `SELECT user_id, event_time,
       event_time - LAG(event_time) OVER (
       PARTITION BY user_id
       ORDER BY event_time
       ) AS gap
FROM events;` | Gap between consecutive events per user — the basis of session/streak detection. |
| FIRST_VALUE / LAST_VALUE | `SELECT day, price,
       FIRST_VALUE(price) OVER (
       ORDER BY day
       ) AS first_price,
       LAST_VALUE(price) OVER (
       ORDER BY day
       ROWS BETWEEN UNBOUNDED PRECEDING
         AND UNBOUNDED FOLLOWING
       ) AS last_price
FROM prices;` | Pick specific rows from the frame. `LAST_VALUE` needs the frame ending at `UNBOUNDED FOLLOWING`, otherwise it returns the current row. |

## Ranking, dedup, top-N

| Clause | How to use | Explained |
| --- | --- | --- |
| RANK | `SELECT productName, buyPrice,
       RANK() OVER (
       ORDER BY buyPrice DESC
       ) AS rank
FROM products;` | Rank with gaps on ties (1, 1, 3). |
| DENSE_RANK | `SELECT productName, buyPrice,
       DENSE_RANK() OVER (
       ORDER BY buyPrice DESC
       ) AS dense
FROM products;` | Rank without gaps on ties (1, 1, 2). |
| ROW_NUMBER | `SELECT productName, buyPrice,
       ROW_NUMBER() OVER (
       ORDER BY buyPrice DESC
       ) AS rn
FROM products;` | Always-unique row numbers. The daily trio is `ROW_NUMBER` / `RANK` / `DENSE_RANK` — `NTILE(n)` (buckets) is the fourth. |
| TOP-N per group | `SELECT *
FROM (
    SELECT *,
       ROW_NUMBER() OVER (
       PARTITION BY productLine
       ORDER BY buyPrice DESC
       ) AS rn
    FROM products
) ranked
WHERE rn <= 3;` | Rank within each group, then filter the rank — top 3 most expensive per product line. |

> `QUALIFY` (BigQuery, Snowflake, DuckDB) lets you filter window results
> directly. PostgreSQL wraps the query in a subquery or CTE instead.

| Clause | How to use | Explained |
| --- | --- | --- |
| DEDUP (ROW_NUMBER) | `SELECT *
FROM (
    SELECT *,
       ROW_NUMBER() OVER (
       PARTITION BY customerNumber
       ORDER BY updated_at DESC
       ) AS rn
    FROM customers_raw
) ranked
WHERE rn = 1;` | Keep the latest row per key — portable, and probably the most-written query in data engineering. |
| DEDUP (DISTINCT ON) | `SELECT DISTINCT ON (customerNumber) *
FROM customers_raw
ORDER BY customerNumber,
         updated_at DESC;` | PostgreSQL shortcut for the same thing. |
| DEDUP (GROUP BY) | `SELECT customerNumber,
       MAX(updated_at) AS last_seen
FROM customers_raw
GROUP BY customerNumber;` | Collapse to aggregates instead of keeping a full row. |

## Writing data: DDL, DML, upserts

The original sheet is read-only. A data engineer also creates, loads, updates,
and deletes:

| Clause | How to use | Explained |
| --- | --- | --- |
| CREATE TABLE AS | `CREATE TABLE silver_orders AS
SELECT orderNumber, orderDate, status
FROM orders;` | Create a table from a query — the standard "materialize a transformation" move. |
| CREATE TABLE | `CREATE TABLE daily_sales (
    day DATE PRIMARY KEY,
    revenue NUMERIC(12,2) NOT NULL,
    order_count INTEGER DEFAULT 0
);` | Explicit table definition with types and constraints. |
| INSERT | `INSERT INTO daily_sales
    (day, revenue, order_count)
VALUES ('2026-08-16', 125000.00, 41);` | Insert rows, or insert the result of a query with `INSERT INTO ... SELECT ...`. |
| UPDATE / DELETE | `UPDATE daily_sales
SET revenue = revenue * 1.1
WHERE day = '2026-08-16';`
`DELETE FROM daily_sales
WHERE day < '2026-01-01';` | Change or remove rows — always with a `WHERE`. |
| ALTER / DROP | `ALTER TABLE daily_sales
ADD COLUMN region TEXT;`
`DROP TABLE IF EXISTS tmp_staging;` | Change the schema, drop a table. |
| UPSERT (ON CONFLICT) | `INSERT INTO daily_sales
    (day, revenue, order_count)
VALUES ('2026-08-16', 125000.00, 41)
ON CONFLICT (day) DO UPDATE
SET revenue = EXCLUDED.revenue,
    order_count = EXCLUDED.order_count;` | Insert, or update if the key already exists. `EXCLUDED` is the row that would have been inserted. PostgreSQL. |
| MERGE | `MERGE INTO target t
USING source s ON t.id = s.id
WHEN MATCHED THEN
    UPDATE SET t.status = s.status
WHEN NOT MATCHED THEN
    INSERT (id, status)
    VALUES (s.id, s.status);` | The portable upsert across warehouses (BigQuery, Snowflake, SQL Server, DuckDB). |
| TRANSACTIONS | `BEGIN;
DELETE FROM daily_sales
WHERE day = '2026-08-16';
INSERT INTO daily_sales SELECT ...;
COMMIT;` | Make multi-statement changes atomic — a failed pipeline step never leaves a half-written table. `ROLLBACK` undoes. |

## JSON and semi-structured data

Event payloads and API responses are JSON. PostgreSQL uses `jsonb`; BigQuery and
Snowflake have native JSON types:

| Clause | How to use | Explained |
| --- | --- | --- |
| JSON extraction | `SELECT payload->>'customer_id' AS customer_id,
       payload->'items'->0->>'sku' AS first_sku
FROM events;` | `->>` returns text, `->` returns json. `payload ? 'refund'` checks a key exists. |
| JSON filtering | `SELECT *
FROM events
WHERE payload->>'status' = 'failed';` | Filter on a nested value. |
| UNNEST (flatten arrays) | `SELECT e.id, item->>'sku' AS sku
FROM events e
CROSS JOIN LATERAL
    jsonb_array_elements(e.payload->'items')
    AS item;`
BigQuery/Snowflake:
`SELECT id, sku
FROM events, UNNEST(items) AS item;` | Explode an array into one row per element. |

## Materialization: views and temp tables

| Clause | How to use | Explained |
| --- | --- | --- |
| VIEW | `CREATE VIEW active_customers AS
SELECT *
FROM customers
WHERE creditLimit > 0;` | A saved query; no data is stored. |
| MATERIALIZED VIEW | `CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT orderDate::date AS day,
       SUM(amount) AS revenue
FROM orders
GROUP BY 1;`
`REFRESH MATERIALIZED VIEW mv_daily_sales;` | Stores the result and must be refreshed. `REFRESH ... CONCURRENTLY` refreshes without blocking readers (PostgreSQL). |
| TEMP TABLE | `CREATE TEMP TABLE tmp_recent AS
SELECT *
FROM orders
WHERE orderDate >= '2026-01-01';` | Lives for the session — great for multi-step scripts. |

## Pagination for pipelines

| Clause | How to use | Explained |
| --- | --- | --- |
| LIMIT / OFFSET | `SELECT *
FROM orders
ORDER BY orderNumber
LIMIT 1000 OFFSET 50000;` | Rescans skipped rows, so it degrades the deeper you page, and drifts when rows are inserted between pages. Fine for admin UIs. |
| Keyset pagination | `SELECT *
FROM orders
WHERE orderNumber > :last_seen_id
ORDER BY orderNumber
LIMIT 1000;` | Constant-time at any depth, on an indexed key — the right way for big exports. |

## Query optimization

### Read the plan

| Clause | How to use | Explained |
| --- | --- | --- |
| EXPLAIN ANALYZE | `EXPLAIN ANALYZE
SELECT *
FROM orders o
JOIN customers c
    ON c.customerNumber = o.customerNumber
WHERE o.orderDate >
      CURRENT_DATE - INTERVAL '30 days';` | `EXPLAIN` estimates; `EXPLAIN ANALYZE` runs the query and reports actual time and rows. Trust the actuals over the estimates. |

- **Seq Scan** — reads the whole table. Fine for small tables, a red flag for big filtered lookups.
- **Index Scan** — uses an index to find rows. What you want for selective predicates.
- **Index Only Scan** — index alone answers the query. Best case.
- **Hash Join** — one side hashed, probed by the other. Normal for large equi-joins.
- **Nested Loop** — row-by-row join. Fine for small sides, slow at scale.

### Indexes

| Clause | How to use | Explained |
| --- | --- | --- |
| CREATE INDEX | `CREATE INDEX idx_orders_customer_date
ON orders (customerNumber, orderDate DESC);`
`CREATE INDEX idx_customers_email_lower
ON customers (LOWER(email));` | Composite column order matters: equality columns first, then the range/order column. Expression index for `LOWER(email)` lookups. |
| Partial index | `CREATE INDEX idx_orders_open
ON orders (orderDate)
WHERE status = 'In Process';` | Index only a subset of rows — small and fast. |

> Do not index small tables, low-cardinality columns, or columns you update
> constantly — the write cost outweighs the read benefit.

### Anti-patterns that defeat indexes

| BAD | GOOD |
| --- | --- |
| `WHERE LOWER(email) = 'a@b.com'
  -- function hides the index` | `WHERE email = 'a@b.com'
  -- or index LOWER(email)` |
| `WHERE name LIKE '%smith'
  -- leading wildcard, no b-tree` | `WHERE name LIKE 'smith%'` |
| `WHERE varchar_col = 123
  -- implicit cast disables index` | `WHERE varchar_col = '123'` |
| `WHERE a = 1 OR b = 2
  -- OR defeats index usage` | `SELECT * FROM t WHERE a = 1
UNION ALL
SELECT * FROM t WHERE b = 2` |

> Avoid `SELECT *` in production: it drags unused columns, defeats index-only
> scans, and breaks silently when the schema changes.

### Filter before you join

| Clause | How to use | Explained |
| --- | --- | --- |
| Pre-filter with CTE | `WITH active_orders AS (
    SELECT orderNumber, customerNumber
    FROM orders
    WHERE orderDate >= '2026-01-01'
),
active_customers AS (
    SELECT customerNumber, customerName
    FROM customers
    WHERE creditLimit > 1000
)
SELECT c.customerName, a.orderNumber
FROM active_orders a
JOIN active_customers c
    ON c.customerNumber = a.customerNumber;` | Shrink each side as much as possible before the join, so the join works on the smallest row set. Filter both tables, not just one. |

### Maintenance

| Clause | How to use | Explained |
| --- | --- | --- |
| ANALYZE / VACUUM | `ANALYZE orders;
  -- refresh planner statistics

VACUUM ANALYZE orders;
  -- reclaim dead rows (PostgreSQL)` | Keep planner statistics fresh and tables tidy. |
| REINDEX | `REINDEX INDEX idx_orders_customer_date;` | Rebuild a bloated index. |

## Engine quick reference

SQLite dot-commands (inside the `sqlite3` shell):

```text
.tables                  -- list tables
.schema table_name       -- show a table's schema
.mode column             -- column output
.headers on              -- show headers
.open filename           -- open a database file
.quit                    -- exit
```

PostgreSQL psql meta-commands:

```text
\l                       -- list databases
\c database_name         -- connect
\dt                      -- list tables
\d table_name            -- describe a table
\du                      -- list roles
\timing                  -- toggle query timing
\i filename              -- run a SQL file
\q                       -- quit
```

Warehouse notes:

- BigQuery: use `MERGE`, `QUALIFY`, `UNNEST`, `SAFE_CAST`, `DATE_TRUNC`.
- Snowflake: `QUALIFY`, `MERGE`, `FLATTEN`, `TRY_CAST`, `IFF` instead of `CASE` shorthand.
- DuckDB: Postgres-style syntax plus `QUALIFY` and direct Parquet/CSV reads (`SELECT * FROM 'file.parquet'`).
- MySQL: `CONCAT` instead of `||`, `SUBSTRING` not `SUBSTR`, no `ILIKE`, limited `EXCEPT`/`INTERSECT` support before 8.0.31.

## Common mistakes in production SQL

- `SELECT *` everywhere — pulls unneeded columns, defeats index-only scans, breaks when schemas change.
- **Filtering after joining** — joining two huge tables, then applying `WHERE`. Pre-filter each side first.
- **Paging with `LIMIT/OFFSET` on large tables** — deep offsets rescan everything. Use keyset pagination.
- **Functions on indexed columns** — `LOWER(col)`, `DATE(col)`, or implicit casts in `WHERE` silently turn an index scan into a seq scan.
- **`UNION` when `UNION ALL` is fine** — `UNION` sorts and dedups even when you know there are no duplicates.
- **Naive timestamps** — storing times without a timezone, then guessing what "3 PM" means across systems and timezones.

