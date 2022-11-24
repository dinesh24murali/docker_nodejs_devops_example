
# Docker swarm

- [Docker swarm](https://docs.docker.com/engine/swarm/) is an orchestrator that will make it easy to deploy, and update multiple containers.
    - Docker swarm has manager nodes and worker nodes. Manager nodes will send tasks to worker nodes
    - Docker swarm is disabled by default

- enable docker swarm. This command will automatically create a manager node

```
docker swarm init --advertise-addr <public ip address>
```

- add node to swarm

```
docker swarm join --token <token> <ip address>
```

- get swarm help

```
docker service --help
```

- we can add docker swarm related configs directly to our `docker-compose.yml` file
- We can specify the number of containers we need to run for a particular service
- we can configure rolling update so that we can minimize the down time we get when we update the application

### Example:

```
version: "3"
services:
  node-app:
    deploy:
      replicas: 8
      restart_policy:
        condition: any
      update_config:
        parallelism: 2
        delay: 15s
    build: .
    environment:
      - PORT=3000
    depends_on:
      - mongo
```

- Here we can configured `update_config` with `parallelism` as 2, meaning we will update 2 containers parallely when we are updating our server

## Deploy our code using docker swarm

- we use `docker stack` to deploy using docker swarm

```
docker stack deploy --help
```

- For this project after we configure swarm like we have shown above we can run the following, run same command to update the stack

```
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml <name>
```

- List all nodes

```
docker node ls
```

- List all stacks

```
docker stack ls
```

- List all services in a stack

```
docker stack services <name>
```

- List of tasks in a stack

```
docker stack ps <name>
```
