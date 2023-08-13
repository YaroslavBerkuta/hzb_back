# Back-end for project Joy Job

[Application design](https://www.figma.com/file/QWiiRBZV6IjQsRIfQpyjJv/baranova27app?node-id=0%3A1)

### Requirements
1. Docker 
2. Docker-compose
3. Node.js 
4. npm
5. git 

### Setting project
1. Clone git repository 
2. Install dependency ```npm install```
3. Create .env file from example.env

### Develop 

1. Run build script ```npm run build:dev```
2. Run docker containers ```docker-compose up```
3. Write code)

### Migrations 

Library for migration - [node-pg-migrate](https://salsita.github.io/node-pg-migrate/#/)

Up migrations ```npm run migrate up```
Down migrations ```npm run migrate down```

### Seeds

The project has automatic seeds configured, they are launched with the start of the application if the .env option AUTO_SEED_ENABLED=true.
Also, the seeds are written in such a way that they can be run many times but the data is not duplicated.

### Comands 

To run the command, you need to perform the following preparation
1. Run the project for local development [instruction](#Develop_16)
2. Go to the api container ```docker exec -it <container_name or id> /bin/bash ```

Run the comand - ```npx nestjs-command <command> <options>```

Create admin 
```npx nestjs-command create:user admin admin@admin.com 123qqq```