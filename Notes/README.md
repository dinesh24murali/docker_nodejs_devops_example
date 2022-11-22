# Commands to know

- start development environment

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

- stop development environment
- The "-v" flag is used to tell docker-compose that we also want to delete the volumes

docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v


- if you make any change to "Dockerfile" you need to run the docker-compose file with the "--build" flag

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

- if you face trouble when running "npm install" in the project due to some permission issues. Run the follwoing command outside the project folder

sudo chown -R $USER ./docker_nodejs_devops_example/


- get the logs for a particular container. Eg: lets say you are running a nodeJS app in the container and you want to see the logs that appear when you run the server. You can use this command

docker logs <container id or container name> -f

- run a particular service in docker-compose file

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps <service name>

