---
title: The data engineering ecosystem, cloud vs local
eyebrow: FIELD NOTE 04
date: 2026-08
readTime: 15 min read
---

# The data engineering ecosystem, cloud vs local

I want to learn end-to-end data engineering: where data lives, how it gets
in, how it is reshaped, who runs it, how you trust it, and how the platform
itself is built. But I do not have a credit card for the cloud, the free
tiers only last a limited time, and the free versions are limited.

This post walks the life of data stage by stage. For each stage there is a
table comparing the cloud products with their local mock/emulator
counterparts.

If you are new to this, read the **In practice** section first, then come back
to the tables as a reference. All facts were checked in August 2026.

**What the "local version needs to run" column means**

- **No server**: a library, CLI, or script is enough, nothing to start.
- **Container**: one Docker container is enough.
- **Cluster**: a multi-node cluster (e.g., Spark) for real scale.
- **Inherits**: no server of its own; it runs inside whatever engine hosts it.

## Cross-cutting: how code runs

The compute model is a dimension, not a layer: any stage below can run as a
cluster, serverless, or a single local process.

| Compute model | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Cluster (Spark)** | Dataproc, EMR, HDInsight, Databricks | Spark local mode, `apache/spark` or `bitnami/spark` (Docker) | No server (local mode), Container, or Cluster |
| **Serverless (managed, auto-scaling)** | Dataflow, Managed Spark (formerly Dataproc Serverless) | Apache Beam Direct Runner (local, for testing) | No server |
| **Single-node (VM / embedded)** | Compute Engine, EC2, Azure VM | Polars, DuckDB, Pandas | No server |

## Section 1: Storage & Serving

Where data physically lives and how it is served for reading. Read top to
bottom: every layer below reads from row 1.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Object Storage (Data Lake)**: the physical file store everything reads from | GCS, S3, Azure Blob Storage | `fsouza/fake-gcs-server`, MinIO (`minio/minio`), LocalStack | Container |
| **Table format**: an open spec (not a product) that adds schema, transactions, and time travel (query a table as it looked in the past) to files | Iceberg, Delta Lake, Hudi; natively supported by Athena, BigQuery, Snowflake, Databricks, Trino | Iceberg/Delta/Hudi via Spark (Docker) or DuckDB + Iceberg extension + MinIO | Inherits |
| **Query engine**: stateless SQL over lake files; owns no data | Athena, Trino, Redshift Spectrum, BigQuery external tables | Trino (`trinodb/trino`), DuckDB (reads files directly) | Container (Trino) or No server (DuckDB) |
| **Lakehouse (platform)**: one product combining storage + table format + governance + SQL | Databricks, Microsoft Fabric, Dremio, Starburst, Snowflake (Interoperable Lakehouse) | Dremio OSS (`dremio/dremio-oss`), Trino + table format + MinIO, local Spark + Delta/Iceberg + MinIO | Container (Dremio/Trino) or Cluster (Spark) |
| **Warehouse (managed OLAP)**: managed SaaS that owns storage and compute | BigQuery, Snowflake, Redshift, Azure Synapse | `goccy/bigquery-emulator`, `bqemulator` (pip). No official Snowflake/Redshift emulator; community emulators or LocalStack only | Container (goccy) or No server (bqemulator) |
| **Self-managed OLAP database (open source)**: the warehouse idea, but you run it | ClickHouse (open source; ClickHouse Cloud on AWS/GCP/Azure), Apache Druid, Apache Pinot | ClickHouse (`clickhouse/clickhouse-server`), Druid (`apache/druid`), Pinot (`apachepinot/pinot`), DuckDB (embedded) | Container (CH/Druid/Pinot) or No server (DuckDB) |

How to read the three SQL rows: a **query engine** owns no data, a
**warehouse** is a managed service that owns its storage, and a
**self-managed OLAP database** is the same idea as a warehouse but you run it
yourself.

## Section 2: Data Movement

Getting data in from sources, moving it between systems, and pushing it back
out.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Source systems (OLTP databases)**: the transactional databases that ingestion reads from; not movement tools themselves | Cloud SQL, RDS, Aurora, Azure SQL, AlloyDB | MySQL (`mysql`), PostgreSQL (`postgres`) | Container |
| **Ingestion: connector-based EL**: you configure a connector, the vendor runs it | Fivetran, Airbyte Cloud, Stitch, Hevo | Airbyte OSS (`abctl`), Meltano (CLI) | Container (Airbyte) or No server (Meltano) |
| **Ingestion: custom-coded EL**: you write and run the extract-and-load code | Python/PySpark scripts on Dataproc, EMR, HDInsight, Databricks, or VMs | Python + `google-cloud-storage` to fake-gcs, boto3 to MinIO, or Spark in `apache/spark` Docker as a Dataproc stand-in | No server (targets an emulator: Container) |
| **CDC (Change Data Capture)**: captures row-level changes from source DBs; a technique that feeds ingestion, often a managed connector | Datastream, AWS DMS, managed Debezium (via vendor) | Debezium (`debezium/connect` or `quay.io/debezium/server`) + MySQL/Postgres Docker | Container |
| **Streaming / Message Queue**: continuous event delivery, vs the scheduled pulls of batch ingestion | Pub/Sub, Confluent Cloud, Kinesis, Azure Event Hubs, RabbitMQ (managed) | Redpanda, Kafka (`apache/kafka`), `gcloud pubsub emulator`, LocalStack (Kinesis/SQS), RabbitMQ | Container |
| **Reverse ETL**: writes from the warehouse back to SaaS apps; the inverse of ingestion | Census, Hightouch | Manual Python scripts (no active OSS; Grouparoo was archived in 2022) | No server |

## Section 3: Transformation

Turning raw/landed data into clean, query-ready models.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Transformation (SQL-first)**: declarative SQL transforms (dbt/Dataform). Medallion (bronze to silver to gold) is a layout applied to these transforms | dbt Cloud, Dataform (in BigQuery), dbt Core in CI; SQL in BigQuery/Snowflake/ClickHouse | dbt Core (CLI), dbt-duckdb, dbt-clickhouse; SQL in DuckDB (manual `.sql` files) | No server (CLI); ClickHouse target: Container |
| **Transformation (Python-first)**: code-based transforms | PySpark (Dataproc/EMR), Dataflow (Beam) | Polars, Dask, Beam Direct Runner | No server (Dask can scale to a Cluster) |

## Section 4: Orchestration & Ops

Scheduling and operating pipelines: who runs what, when, and how it is going.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Orchestration & workflow** | Cloud Composer, MWAA, Azure Data Factory, Astronomer Astro, Dagster Cloud, Prefect Cloud, Step Functions | Apache Airflow (`apache/airflow`), Dagster OSS (`dagster/dagster`), Prefect OSS | Container (Airflow/Dagster); Prefect: No server |
| **Pipeline monitoring**: logs, metrics, and traces of runs and infrastructure | Cloud Logging, CloudWatch, Azure Monitor, Datadog, Grafana Cloud | `grafana/grafana`, `grafana/loki`, `prom/prometheus`, `otel/opentelemetry-collector` | Container |

## Section 5: Data Governance & Quality

Trust: knowing what data exists, where it came from, whether it is valid, and
what ran.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Data Catalog** | Dataplex, Unity Catalog (managed), AWS Glue Catalog, Microsoft Purview | DataHub OSS, Unity Catalog OSS, Apache Atlas | Container |
| **Data Lineage** | OpenLineage (standard), Atlan | dbt docs (local), Marquez (OSS), OpenLineage clients | No server (dbt docs) or Container (Marquez) |
| **Data Quality / Testing** | dbt tests, Great Expectations Cloud, Soda Cloud, Monte Carlo | Great Expectations (GX Core), Soda Core, dbt test (CLI) | No server |
| **Pipeline run history & audit logs** | Audit tables in BigQuery/Snowflake | `audit_log` & `pipeline_logs` tables in DuckDB | Inherits |

## Section 6: Dev & Delivery

How the platform and its code are built, tested, and shipped.

| Layer | Cloud (GCP / AWS / Azure) | Mock / Emulator Local | What the local version needs to run |
|---|---|---|---|
| **Infrastructure as Code** | Terraform Cloud, Pulumi, Google Cloud Infrastructure Manager (replacement for Deployment Manager) | Terraform CLI + LocalStack (`tflocal`), Pulumi local | No server (Terraform/Pulumi); LocalStack: Container |
| **CI/CD Pipeline** | Cloud Build, GitHub Actions, GitLab CI, Jenkins | act (`nektos/act`), Jenkins (`jenkins/jenkins:lts`) | No server (act); Jenkins: Container |
| **Notebook / Exploration**: a dev workbench, not a pipeline tool | Vertex AI Workbench, Colab, Databricks Notebook | Jupyter (`jupyter/docker-stacks`), VS Code | No server or Container |

## In practice

The tables above map products to their local counterparts. This section
describes how the tools are used in a working pipeline.

**Object storage.** Every layer reads from the same object store: query
engines scan the files, lakehouse platforms organize them into tables, and
warehouses import from them. Local emulators like `fake-gcs-server` and MinIO
exist so the same cloud-style code runs against them unchanged.

**Table formats.** Iceberg, Delta Lake, and Hudi are open table formats that
add schema, transactions, and time travel to files in object storage. They
let different tools, such as DuckDB and Trino, read the same table, and schema
changes apply without rewriting existing files.

**Query engines.** Query engines run SQL directly against files instead of
copying them into a database. Each query re-reads the files, so narrowing the
scan with filters matters. A warehouse keeps its own copy instead, which makes
repeated queries faster at the cost of storage.

**Lakehouse versus warehouse.** A lakehouse keeps data in open file formats
and layers governance on top; a managed warehouse owns storage and compute as
one service. The main practical difference is portability: files in open
formats can be read by any tool, while warehouse storage is managed
internally.

**Self-managed OLAP databases.** ClickHouse, Druid, and Pinot are
open-source OLAP databases that teams run themselves, or use as managed
services (for example ClickHouse Cloud). Running ClickHouse locally uses the
same software as production; the difference is that self-managed deployment
means handling replication, upgrades, and backups yourself.

**Ingestion.** Connector-based ingestion works when a source is supported:
you configure it and the vendor runs it. Custom-coded ingestion means writing
the extract-and-load logic yourself, including retries, schema drift, and
backfills. Teams usually start with connectors and write code for sources
without one.

**CDC.** Polling a timestamp column finds new and updated rows, but not
deletes. CDC reads the database transaction log and captures every row-level
change; Kafka or Pub/Sub then delivers those change events.

**Transformation.** SQL-first transformation keeps logic in versioned SQL
files and works with any warehouse. Python-first transformation handles what
SQL cannot express easily, such as custom parsing or feature logic. Most
pipelines combine both.

**Orchestration.** Orchestration tools schedule tasks, retry failures, and
make dependencies visible. The same DAG file runs in a local Airflow
container and in managed Composer, so the local setup behaves like production.

**Monitoring.** Monitoring covers logs (whether a run happened), metrics (how
long it took), and traces (where it failed). Without it, a failed or silently
stopped pipeline is only noticed when someone checks the logs.

**Governance.** Catalog, lineage, and data quality answer different
questions: what data exists, where it came from, and whether it is valid.
They become necessary as the number of tables grows.

**Audit tables.** An audit table records each load: table name, row count,
timestamp, and status. It enables incremental loads and backfills, and it is
the first place to look when a pipeline stops producing data.

**IaC and CI/CD.** Terraform and Pulumi create cloud services as code. With
LocalStack, the same Terraform plans run against a local AWS emulator. CI
tools run tests and deploys; `act` runs the same GitHub Actions workflow
locally.

**Notebooks.** Notebooks are for exploring data and prototyping
transformations. Once a query is understood, it moves into a dbt model or a
script. Notebooks are not where pipelines run.

## Facts & caveats

These were current in August 2026 and will go stale. Read them only if they
apply to you.

**SCD Type 2: manual MERGE or dbt snapshot.** Slowly changing dimensions
(SCD) track history when a value changes: close the old row, insert the new
one. Hand-written `MERGE` gives full control but must be duplicated per table;
`dbt snapshot` automates the pattern. DuckDB supports `MERGE INTO` since
v1.4.0 (Sep 2025); before that, use `INSERT ... ON CONFLICT`. In ClickHouse,
`ReplacingMergeTree` + `argMax` keeps only the latest state (Type 1-ish), not
full SCD2 history; use `MergeTree` with `valid_from` / `valid_to` /
`is_current` for true SCD2.

**Snowflake/Redshift emulators.** No official emulator exists from either
vendor. Community Snowflake emulators exist (e.g.,
`nnnkkk7/snowflake-emulator`), and LocalStack emulates the Redshift management
API (Postgres-backed). Redshift SQL itself has no fully working emulator.

**Google Cloud Deployment Manager.** End-of-life was extended: support ended
April 1, 2026, with a maximum extension until March 31, 2027, and full
shutdown after June 30, 2027. The replacement is **Google Cloud Infrastructure
Manager** (Terraform-based), not a rename.

**Dataproc Hub** reached end-of-life (Jan 2025); migrate to Vertex AI
Workbench.

**Airbyte OSS** installs via `abctl local install` (Kubernetes in Docker
Desktop); Docker Compose is deprecated.

**Dataform** is now a free service inside BigQuery (acquired by Google in
2020).
