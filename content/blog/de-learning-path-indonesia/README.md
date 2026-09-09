---
title: A data engineering learning path, from zero to hired (Indonesia)
eyebrow: FIELD NOTE 06
date: 2026-08
readTime: 10 min read
---

# A data engineering learning path, from zero to hired (Indonesia)

Before I started, I read somewhere that the way in is "SQL, Python, and one
end-to-end project." That turned out to be true, but it left out the part
that matters most in Indonesia: most "junior" postings quietly ask for 1-3
years of experience, and the real fresh-graduate entry door is the
internship. I wrote this path with that market in mind.

The facts below come from roughly forty Indonesian postings I went through
on Glints, Kalibrr, Jobstreet, and LinkedIn in mid-2026, plus salary
listings and company career pages. It is a sample, not a survey. Treat the
numbers as ranges, not promises.

The path has eight phases. The names describe the level of work, not a
tool: basic scripting first, distributed processing near the end, with
everything in between ordered by how often Indonesian postings actually
ask for it. I also gave each phase a time box, because "from zero to hired"
without a calendar is just a syllabus.

## What the Indonesian market actually asks for

The junior bar is SQL, Python, and basic ETL/ELT. A typical associate
posting asks for "solid SQL", "Python", and "familiarity with ETL".
Airflow, dbt, and Spark show up in junior listings too, but as nice-to-haves.
The Paragon junior listing asks for Airflow, dbt, and Kafka, and it is not
the only one. Treat them as differentiators, not prerequisites.

Spark becomes a real requirement at mid-level. Shopee's full-time data
engineer role asks for 3+ years plus Spark, Flink, or similar big-data
stack; their graduate entry is the internship, which only asks for
familiarity. Banks and e-commerce follow the same shape. If you want Spark
before your first job, you are preparing for the second job.

Salary ranges that actually show up (most postings do not publish salary,
so this is from the ones that do, plus the usual guides):

- Fresh graduate: Rp5.5-8M/month
- Junior with 1-2 years: Rp7-11M
- Mid (2-5 years): Rp12-25M
- Senior (5+): Rp20-40M. The 30-60M figure that floats around is lead or
  principal territory, not typical senior pay.

Fintech and e-commerce pay more. IT services and consulting firms hire
more juniors. More on both below.

A degree is a soft filter, not a hard wall, and cloud certifications help
at the margin. No posting demands one.

## Phase 1: Read data, answer questions with it (1-2 months)

SQL: SELECT, WHERE, JOIN, GROUP BY, simple aggregation. Python: variables,
loops, functions, file I/O. CSV and JSON. Git and the command line from
day one.

The exit test: answer ten business questions from a raw file, once in SQL
and once in Python, and the answers match. That is the whole phase. Do not
collect tools here.

PostgreSQL or DuckDB for SQL practice; Python with pandas or Polars for
scripting.

## Phase 2: Messy data and query plans (2-3 months)

Same languages, deeper. Window functions, CTEs, complex joins. Indexing
and query execution, why the same query is fast or slow. Dataframes for
cleaning, reshaping, merging. API calls with error handling, timeouts,
retries. Parquet and why columnar storage matters.

Phase 1 is fluency. Phase 2 is where you stop looking things up on messy
real data. The exit test: read a query plan and say where the cost is, and
clean a genuinely dirty dataset end to end in Python.

## Phase 3: Model data, build your one project (2-3 months)

This is where the actual job starts. Most junior DE work is SQL plus
ETL/ELT, and this phase is that work:

- Star schemas, facts and dimensions, and stating the grain of a table
  before writing code
- Slowly changing dimensions: Type 2 keeps history, Type 1 overwrites
- ETL versus ELT, and why raw data is kept
- Medallion layering: bronze, silver, gold as raw, clean, ready
- Idempotent writes and quarantine flags for bad rows
- dbt, but only after you can explain what a fact table is. Learning dbt
  before modeling is backwards; it takes days once you understand the
  target.

Build one end-to-end project here: source to warehouse to clean tables.
This is your portfolio. One real project beats ten tutorials.

Exit test: state the grain of your fact table in one sentence, and have the
project working end to end.

## Phase 4: Put it on a schedule (1-2 months)

Modeling gives you the target; this phase gives you the pipeline that
reaches it without breaking.

- DAGs: scheduling, retries, backfills
- Idempotency: re-running a job must not double the data
- Full versus incremental loads, watermarks
- At-least-once delivery and why deduplication matters
- Tests and docs inside the pipeline, not after it
- Dev, staging, production

Airflow, Dagster, or Prefect. For an interview, the concepts matter more
than the operator APIs. Backfills, retries, idempotency, and dedup are the
tested ideas; nobody asks you to recite an operator signature.

Exit test: backfill last month without double-counting, and a test catches
a broken join in your pipeline.

## Phase 5: One cloud, properly (1-2 months, overlaps 3-4)

Skip the certification. You need one cloud's data services well enough to
run real work on them, and that is cheaper to prove than a cert.

- Object storage as the shared foundation
- A managed warehouse: compute and storage separation
- IAM at reasoning level: who can read what, least privilege
- Secrets management
- Cost basics: pay per scan, why bad joins cost money, partition pruning
- Infrastructure as code, budgets as vocabulary

GCS or S3 for storage, BigQuery or Redshift as the warehouse. Emulators
let you practice without a cloud account. Which cloud matters less than
knowing one well.

Exit test: deploy your phase 4 pipeline with least-privilege access,
secrets handled properly, and a rough cost estimate for a query.

## Phase 6: Scale, when you need it (after the first job, 2-4 months)

Distributed processing. This is a mid-level requirement, not a junior one,
so the honest placement is after you start working, unless you are
targeting Spark-first companies from day one.

The important part is the mental model, not the cluster: why one machine
breaks, partitioning, shuffle, skew, lazy evaluation, schema evolution.
PySpark or Databricks if you need a cluster; Polars if one machine is
enough, and for most Indonesian companies, one machine is enough.
"Millions of rows" is not "billions of rows."

Exit test: process more data than fits in memory, incrementally, and
justify the partitioning design and what it costs.

## Phase 7: Production (on the job, continuously)

This is what separates mid from junior, and you mostly learn it by owning
a pipeline that breaks:

- Data quality: tests and checks inside the pipeline
- Monitoring: logs, metrics, freshness, knowing when a pipeline silently
  stopped
- Incident response: runbooks, on-call, postmortems
- Cost optimization: what each query and job costs
- Governance: ownership, access tiers, PII, catalogs, lineage

Data mesh gets discussed at interviews out of proportion to its adoption;
it is an organizational pattern for large companies, not a first-job skill.

Exit test: trace a broken pipeline from alert to root cause, and have a
quality gate that blocks bad data before it reaches consumers.

## Phase 8: Modern storage and real-time (on the job, optional)

- Open table formats: ACID on object storage, schema evolution, time
  travel
- Lakehouse architecture, and what Databricks and Snowflake are actually
  selling
- Message queues: events, topics, partitions, offsets
- Delivery semantics, and why exactly-once is hard
- CDC: capturing row-level changes from a source database
- Batch versus streaming trade-offs

Kafka or Redpanda, Debezium, Iceberg or Delta Lake. Most organizations
only need near-real-time for a subset of data; batch plus micro-batch
covers the rest.

Exit test: say when batch is the right answer and when it is not, and
describe exactly-once from source to sink, including where it breaks.

## The timeline

Part-time study, realistic ranges:

- Phases 1-3: 5-8 months, ending with the portfolio project
- Phase 4-5: 2-4 more months, overlapping
- Apply from there. Most people land the first job via an internship or an
  analyst role that touches SQL and pipelines, not via the self-study path
  alone.

Zero to hired is roughly 6-12 months of focused part-time work. If you are
studying more than a year without applying, you are not studying the right
things. You are comfortable.

## When you are ready to apply

You can start applying after phase 3, with phase 4 as a differentiator.
The concrete signals:

- You can pass a single SQL round: window functions, joins, CTEs,
  aggregation, SCD reasoning
- You have one end-to-end ELT project: source to warehouse to clean
  tables, with one warehouse and one orchestrator
- You can explain ETL vs ELT, medallion layering, and why raw data is kept
- Your code lives in Git and runs from a terminal

Do not wait until you feel ready. Waiting adds months of learning things
that never show up in the interview. The honest counterweight: a portfolio
gets you the interview, experience gets you the offer. Projects are weak
compared with job experience, which is why the analyst-to-DE lateral move
and the internship are the lowest-bar entries. The r/dataengineering
consensus on breaking in is exactly that. If you are stuck, apply for
analyst or BI roles that touch SQL and pipelines, automate everything you
can in that role, and present that work as engineering experience.

## After the first job

Progression is ownership scope, not more tools:

- **Junior (0-2 years):** well-scoped tasks. Add a source, write models to
  spec, fix DAGs, add monitoring. The promotion trigger is reliability and
  needing less supervision.
- **Mid (2-5 years):** you ship multi-table projects end to end, design
  schemas before writing models, debug your own pipelines. Phases 6 and 7
  move from concepts to practice.
- **Senior (5+):** system selection, cost optimization, technical
  leadership, production readiness. The common failure mode is confusing
  doing more with owning more.

## Notes specific to Indonesia

- **Target the internships.** Shopee, e-commerce, and banking all run DE
  internships that only ask for familiarity, and the junior postings that
  do exist often want 1-3 years anyway. Internship is the honest fresh-grad
  route.
- **Match your portfolio to local postings.** An ELT project with Docker,
  a DAG, and a warehouse is exactly the shape junior employers describe.
- **Referrals help, but the "2x" is a company tagline, not a law.** Some
  postings (eFishery has used "referensi meningkatkan kesempatan interview
  hingga 2x") say it explicitly; most just mean your CV gets read faster.
  Ask anyway. LinkedIn is the main channel.
- **IT services hire juniors in volume:** EDTS (Salim Group's data and
  digital consultancy), Metrodata, Accenture, Deloitte, and staffing shops
  like TOG Indonesia place DEs at client companies. Fintech and e-commerce
  pay better but compete harder.
- **Salary reality check** on the numbers above: the 30-60M senior range
  you see on social media is not the typical senior salary. Anchor on the
  listing ranges, not the outliers.
- **Technical English matters**; full fluency is only required at
  multinationals.
- **Bootcamps with placement pipelines exist** (Binar, Digital Skola,
  RevoU, Purwadhika among others). They are a legitimate route, but verify
  the placement claims before paying. A self-study path with one strong
  project costs less and works too.

Start with ten questions on a CSV. Everything else on this page is just
that, repeated at increasing scale.
