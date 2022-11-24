
# Add docker hub repo name in docker-compose file

- The benefit of adding the repo name for a specific service in docker-compose.yml file is we can tell docker to use our specific image that we deployed to docker hub

- This will help with deploying code to production because we won't need to build the image in the production server. We can simple push the updated image to docker hub and pull that image into our production server

- In the production server we can pull the updated coker image and rebuild the container.

- This is more effecient because if we build the image in the production server, it will consume a lot of memory which will intern affect the performance of the production server. This will result in the production server becomming slow during image building when clients make requests to the server

## Example to show where to add the docker hub repo name in docker-compose file:

```
version: "3"
services:
  node-app:
    build: .
    image: sloppynetworks/node-app <----- this is the repo name
    environment:
      - PORT=3000
    depends_on:
      - mongo
```

For both of the following commands rememebr that we have add the docker repo name in our docker-compose file

### How to build our docker image in local:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build <service name>
```

Push all the images by not specifying the service name

Eg:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app
```


### How to push our image to docker hub

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push <service name>
```

Eg:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app
```

### How to pull our image from docker hub

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
```

