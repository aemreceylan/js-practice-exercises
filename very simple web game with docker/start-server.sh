#!/bin/bash
docker build -t node_server .
docker run -p 8080:8080 --name c_node_server -d node_server -e KEEP_SERVER_RUNNING=true 
docker exec -it c_node_server /bin/bash
node server.js
