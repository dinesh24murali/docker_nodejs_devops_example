
# How to handle environment variables in production

1. We cannot add our environment variables to our github repo, so we add a  ".env" file at the root of the server and add all our variables in there

2. Once we have the .env file ready, open `.profile`. Go to the end of the file add the following

set -o allexports; source <path to the nev file>; set +o allexports

Example:
--------
```
set -o allexports; source /root/.env; set +o allexports
```
3. Now this will load the env even if we restart the server
