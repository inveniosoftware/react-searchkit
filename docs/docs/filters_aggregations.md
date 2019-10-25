---
id: filters-aggregations
title: Filters And Aggregations
---

## Filters

Filters allow to refine search results with exact match on specific fields. For example, if your data have a number field `age`, you can request results that have a specific exact value `age=25`.

In React-SearchKit, the query state contains a field called `filters` which contains the list of filters selected by the user.

[Filters](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html#filter-context) and [Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html) are fundamental concepts of Elasticsearch.
However, they can be applied to any backend or REST APIs.

## Aggregations

Aggregations can be defined as a set of complex summaries for the search results. Or in other words, a grouping of the search results to provide different statistics. For example, for the previous query `age=25`, the search results can include the list of all possible values for the field `age` and the number of results for each value.

For example, for each existing `age` value:

* `25`: 3 results
* `26`: 2 results
* `31`: 18 results
* etc.

In Elasticsearch, there are several types of aggregations available. React-SearchKit comes out of the box with a component that implements [Bucket Terms Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html), but any other aggregation should be easy to implement.

## Bucket aggregations

The `<BucketAggregation>` component defines the name of the aggregation to request to the backend or Elasticsearch and the field to compute the aggregations on.
For example:

```jsx
<BucketAggregation
    title="All ages"
    agg={{
        field: 'age',
        aggName: 'ages_aggregation',
    }} />
```

> It is your responsibility to create the search request to your backend taking into account the configured aggregations.

The `results` state should then contains aggregations results in the object `aggregations`. The `<BucketAggregation>` component expects the  Elasticsearch format:

```json
{
    "ages_aggregation": {
        "buckets": [
            {
                "key": 25,
                "doc_count": 3
            },
            {
                "key": 26,
                "doc_count": 2
            },
            {
                "key": 31,
                "doc_count": 18
            }
        ]
    }
}
```

The `filters` query state will contain the list of filters that the user has selected. Given that you can have multiple aggregations configured, each filter should be formatted as `[ "<agg_name>", "<value>" ]`, for example:

```json
{
    ...
    "filters": [
        [ "ages_aggregation", 25 ],
        [ "ages_aggregation", 31 ]
    ]
}
```
