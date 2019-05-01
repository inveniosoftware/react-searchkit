#!/usr/bin/env bash

printf "Deleting any previous index named 'rsk_documents'\n"
curl -X DELETE "localhost:9200/rsk_documents?pretty=true"

printf "\n\nCreating a new index named 'rsk_documents' with mapping\n"
curl -X PUT "localhost:9200/rsk_documents?pretty=true" -H 'Content-Type: application/json' -d'
{
    "mappings" : {
        "_doc" : {
            "properties" : {
                "title": { "type": "text" },
                "description": { "type": "text" },
                "authors": { "type": "text" },
                "genre": { "type": "keyword" }
            }
        }
    }
}
'

printf "\n\nPopulating with demo data\n"
curl -X POST "localhost:9200/_bulk?pretty=true" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "rsk_documents", "_type" : "_doc", "_id" : "1" } }
{ "title" : "Deception", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et felis ut dui vehicula lobortis. Duis fringilla facilisis quam at.", "authors": ["Amanda Quick"], "genre": ["adventure"] }
{ "index" : { "_index" : "rsk_documents", "_type" : "_doc", "_id" : "2" } }
{ "title" : "A Game of Thrones", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus feugiat ipsum et risus pharetra, id lacinia tortor interdum. Sed ultricies.", "authors": ["George R.R. Martin"], "genre": ["adventure", "drama"] }
{ "index" : { "_index" : "rsk_documents", "_type" : "_doc", "_id" : "3" } }
{ "title" : "The Secrets of Ivy Garden", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis nulla velit, sit amet aliquam massa tempor ut. Aliquam viverra.", "authors": ["Catherine Ferguson"], "genre": ["comic", "adventure"] }
{ "index" : { "_index" : "rsk_documents", "_type" : "_doc", "_id" : "4" } }
{ "title" : "After Ever Happy", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel est euismod ex mattis placerat id vel dui. Fusce fringilla.", "authors": ["Anna Todd"], "genre": ["thriller", "comic"] }
{ "index" : { "_index" : "rsk_documents", "_type" : "_doc", "_id" : "5" } }
{ "title" : "Lost Roses", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit lorem sed lorem ultricies, in mollis elit convallis. In mollis.", "authors": ["Martha Hall Kelly"], "genre": ["drama", "thriller", "comic"] }
'
