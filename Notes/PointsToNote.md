
# Points to note

- When you are trying to connect to a database that is inside a docker container from a server that is running outside the container. There is a chance that our server might load first before the db container is ready. In this case the server will fail to connect to the database, because the database is not ready at that time. So we have to write some logic in our code to retry the db connection until it succeeds. If you are running your server from within another docker container there is a section called "depends_on" on the docker-compose file that will make docker to first load the container that is in the dependency and then run the current container. However this will not always fix the issue. The most reliable solution is to retry the connection.
