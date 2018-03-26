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
  -H 'Authorization: 5CD4ED173E1C95FE763B753A297D5' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Joe Doe",
  "avatar": "http://avatar.com/john-doe/1245"
}'
```
