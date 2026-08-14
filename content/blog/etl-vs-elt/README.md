---
title: ETL vs ELT, a practical comparison
eyebrow: FIELD NOTE 03
date: 2026-08
readTime: 5 min read
---

# ETL vs ELT, a practical comparison

Two data integration patterns move data from source systems to a warehouse or
lake. The difference between them comes down to two questions: where the
transformation runs, and what reaches the target.

```
ETL: source -> extract -> transform (outside the target) -> load -> target
ELT: source -> extract -> load (raw data into the target) -> transform (inside the target)
```

## ETL

ETL transforms data on a separate processing server (Spark, Informatica, AWS
Glue, and similar) and loads only the transformed result into the warehouse.
The warehouse receives clean data that reporting tools can use directly.

## ELT

ELT loads raw data into the warehouse first. Transformation runs inside the
warehouse using its own compute, typically with SQL or a tool like dbt.

## Key differences

**Order.** ETL: extract -> transform -> load. ELT: extract -> load -> transform.

**Transform location.** ETL runs transformation outside the target on a
processing server. ELT runs it inside the target using SQL or dbt with
warehouse compute.

**What reaches the target.** ETL loads transformed data only. ELT loads raw,
unprocessed data.

**Raw data.** ETL retains raw data in staging, a data lake, or the source —
outside the warehouse. ELT loads raw data into the warehouse as an initial
layer.

**Data types.** ETL handles structured data mainly. ELT handles structured,
semi-structured, and unstructured data.

**Initial speed.** ETL is slower: two hops, transform before load. ELT is
faster: direct load with parallel transform.

**Infrastructure cost.** ETL often requires a separate transform server. ELT
uses warehouse compute (pay-per-query).

**Security.** ETL often builds PII masking separately. ELT uses warehouse-native
security and granular access.

**Typical use.** ETL suits legacy databases, IoT edge filtering, PII that must
be scrubbed before storage, and on-prem warehouses. ELT suits cloud warehouses
(Snowflake, BigQuery, Redshift), re-processing raw data without re-extraction,
and SQL-based transforms with dbt.

## Two facts that are commonly misstated

**ETL retains raw data.** Raw data is stored in a staging area, a data lake,
or the source system. It is not loaded into the warehouse, but it is not
deleted.

**ELT does not guarantee full raw availability.** An ELT pipeline may load a
column subset or only specific transformed results. Full raw access is the
typical goal, not a property of the pattern itself.

## Raw data location

**ETL.** Raw data lives in a staging area, data lake, or source system outside
the warehouse. Example stack: AWS S3 or GCS staging, processed by AWS Glue,
Spark, or Informatica, then loaded into BigQuery, Snowflake, or Redshift.

**ELT.** Raw data lives inside the warehouse as an initial layer, before
transformation. Example stack: loaded directly into Snowflake, BigQuery, or
Redshift, transformed with dbt or Dataform.

**ELT (variant).** Raw data lives on a worker disk, read by the transform tool
without copying it into the warehouse. Example stack: dbt reading a CSV or
Parquet on the Airflow worker, DuckDB as the transform engine.

## Choosing between them

ETL remains useful for legacy databases, IoT edge workloads that filter at the
source, and regulations that require PII to be scrubbed before data reaches
the warehouse. ELT is the common choice on modern cloud warehouses where raw
data can be stored cheaply, re-processed without re-extraction, and
transformed with SQL and dbt.

## References

**AWS.** [What's the Difference Between ETL and ELT?](https://aws.amazon.com/compare/the-difference-between-etl-and-elt/)

**IBM.** [ELT vs. ETL: Similarities and Differences](https://www.ibm.com/think/topics/elt-vs-etl)

**datadef.** [ETL vs ELT: Which Pattern Fits Your Data Stack?](https://datadef.io/guides/en/etl-vs-elt)
