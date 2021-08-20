https://monosnap.com/file/2JN7bAL57muQZSU0LTNWj926jscsvn
https://monosnap.com/file/dH7Wa6UIuKO1KOnA5PaPyuad45TN3t
https://monosnap.com/file/yJMqkgo1BKZBrjl5r7uIUK9Tv6zUaI


**0.Run MongoDB server.**

For development purposes you may either to install MongoDB server
locally on your machine or run it in Docker container and expose standard
port 27017:
```bash
 docker run --rm -d \
   --name mongo-server \
   -p 27017:27017 \
    mongo
```

**1. Install project**

Project contains two seperate folders `client`, `server`.
Install npm dependencies (all commands are supposed to run from the root project folder):
```
cd ./client && npm i
cd ./server && npm i
```
**2. Apply migration scripts**
If you would like to fiil DB with initial data to test, run migration script, from the
root project folder:
```
npm run migrate:dev
```
**3. Run server and client for development**
```
npm run start:dev
```