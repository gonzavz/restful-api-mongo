# RESTful API with MongoDB

RESTful API for manage Users and Articles.

## Technologies
- MongoDB 3.4
- ExpressJs
- Mongoose
- joi
- Mocha and Chai for tests
- Docker


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
