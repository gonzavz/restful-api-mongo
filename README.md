# RESTful API with MongoDB

RESTful API for manage Users and Articles.

## Technologies
- MongoDB 3.4
- ExpressJs
- Mongoose
- joi
- celebrate
- Mocha, Supertest and Chai for tests
- Docker

## Setup

Clone repo

```bash
$ git clone git@github.com:gonzavz/restful-api-mongo.git
$ cd restful-api-mongo
$ docker-compose build
$ docker-compose up
```

## Dockers
The proyect has a local infrastructure setted up using docker-compose.

### Included services
- api: its the web server for the restful API and its mapped to local **port 3000**
- db: mongodb 3.6 its mapped to local **port 27017**

### Start services

```
docker-compose up
```

### Tests

We use dockers for test, the following command will create a new container to run all tests and destroy it after that.

```
docker-compose run --rm api npm test
```
Note: Its important to add **--rm** to the command other wise the new container will not be destroyed.

## Services

### Users

POST /users
- request headers
```
Authorization: [AUTHORIZATION_TOKEN]
```
- request body
```json
{
 "name": "Joe Doe",
 "avatar": "http://avatar.com/john-doe/1245"
}
```
- response body
```json
{
  "_id": "5ab8917ad75f2f00116183ed",
  "name": "Joe Doe",
  "avatar": "http://avatar.com/john-doe/1245",
  "createdAt": "2018-03-26T06:21:46.783Z",
  "updatedAt": "2018-03-26T06:21:46.783Z",
  "__v": 0
}
```
- curl

```curl
curl -X POST \
  http://localhost:3000/users \
  -H 'Authorization: [AUTHORIZATION_TOKEN]' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Joe Doe",
  "avatar": "http://avatar.com/john-doe/1245"
}'
```

### Articles
POST /articles

- request headers
```
Authorization: [AUTHORIZATION_TOKEN]
```
- request body
```json
{
 "user": "5ab73cdfff2e3f00115b3004",
 "title": "Build a RESTful API with nodejs",
 "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful"
  ]
}
```
- response body
```json
{
  "tags": [
      "nodeJs",
      "javascript",
      "RESTful"
  ],
  "_id": "5ab8c2015c8dbb00116eec15",
  "user": "5ab73cdfff2e3f00115b3004",
  "title": "Build a RESTful API with nodejs",
  "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
  "__v": 0
}
```
- curl
```
curl -X POST \
  http://localhost:3000/articles \
  -H 'Authorization: [AUTHORIZATION_TOKEN]' \
  -H 'Content-Type: application/json' \
  -d '{
 "user": "5ab73cdfff2e3f00115b3004",
 "title": "Build a RESTful API with nodejs",
 "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful"
  ]
}'
```

PUT /articles/[id]

- request headers
```
Authorization: [AUTHORIZATION_TOKEN]
```
- request body
```json
{
 "title": "Build a RESTful API with nodejs and test it",
 "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful",
  "mocha",
  "chai"
  ]
}
```
Note: you can update **user**, **title**, **text** or **tags**
- response body
```json
{
  "tags": [
    "nodeJs",
    "javascript",
    "RESTful",
    "mocha",
    "chai"
  ],
  "_id": "5ab84af755556500115f3254",
  "user": "5ab73cdfff2e3f00115b3004",
  "title": "Build a RESTful API with nodejs and test it",
  "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
  "__v": 2
}
```
- curl
```
curl -X PUT \
  http://localhost:3000/articles/[ArticleId] \
  -H 'Authorization: [AUTHORIZATION_TOKEN]' \
  -H 'Cache-Control: no-cache' \
  -d '{
 "title": "Build a RESTful API with nodejs and test it",
 "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful",
  "mocha",
  "chai"
  ]
}'
```

DELETE /articles/[id]

- request headers
```
Authorization: [AUTHORIZATION_TOKEN]
```
- response body
```json
{
    "tags": [
        "nodeJs",
        "javascript",
        "RESTful",
        "mocha",
        "chai"
    ],
    "_id": "5ab84af755556500115f3254",
    "user": "5ab73cdfff2e3f00115b3004",
    "title": "Build a RESTful API with nodejs and test it",
    "text": "This Article teach you how to build a RESTful API in 10 minutes!!",
    "__v": 2
}
```
- curl
```
curl -X DELETE \
  http://localhost:3000/articles/[ArticleId] \
  -H 'Authorization: [AUTHORIZATION_TOKEN]' \
  -H 'Content-Type: application/json' \
```

GET /articles/?query

- request headers
```
Authorization: [AUTHORIZATION_TOKEN]
```
- request query params
```
tags: the tag you are looking for, it could be an array.
 - single tag example: tags=nodeJs
 - multiple tags example: tags=nodeJs&tags=javascript

```
```
limit: the pagination limit. [optional]
```
```
offset: the pagination offset. [optional]
```
- response body
```json
{
  "articles": [
    ...List of Articles
  ],
  "total": 0,
}
```
- curl
```
curl -X GET \
  'http://localhost:3000/articles/?tags=nodeJs' \
  -H 'Authorization: [AUTHORIZATION_TOKEN]'
```
