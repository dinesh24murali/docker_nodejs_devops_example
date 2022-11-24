
# How to deploy our code to server

1. Since we have created multiple container for each service we can first install docker in the server

2. Then we need to install docker-compose

3. After that we need to pull our code into the server

4. Once we have the code we can run the following command 
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
This should completely setup our production environment

# How to push latest code to the server

- Don't build your docker image in your production server as it will consume a lot of resources and your server will become too weak to handle production traffic

1. You need to create an account in docker hub. Then create a repo in docker hub.

2. Build the docker image in your local with the updated code

3. Push the updated image to docker hub

4. Login to the production server

5. Do `docker pull` to pull the updated image from docker hub

6. You might need to recreate or force recreate the container you want to update

- There will be instructions on how to push and pull code to docker hub in a seperate .md file in this repo

# Update particular docker image

- to update one particular image we need to run the following command.

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build <service name>
```

- if you don't want to touch any of the depending services when updating a particular service use `--no-deps` flag. This will be useful when you don't want to accidently rebuild the database service when you accidently pushed some unwanted code

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps <service name>
```

### Example:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app
```

In this project `node-app` service has `mongo` as the dependency. So when we build the `node-app` image we can prevent the mongo image from being updated

#  How to force recreate a container

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app
```

# Update particular service:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-app
```

# Some points

- There is a docker image called [docker watchtower](https://github.com/containrrr/watchtower) that we can run in our production server that will constantly check docker hub for changes in the docker repo/image we are using in a particular service

