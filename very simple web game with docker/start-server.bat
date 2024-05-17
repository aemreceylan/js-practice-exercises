docker build -t node_server .
docker run -p 8080:8080 --name c_node_server -d node_server 
docker exec -it c_node_server powershell
node server.js
