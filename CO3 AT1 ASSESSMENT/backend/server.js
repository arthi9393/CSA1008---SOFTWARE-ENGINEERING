const http = require("http"); 
const server = http.createServer((req, res) => { 
  res.writeHead(200, { "Content-Type": "text/plain" }); 
  res.end("SCPMS backend is running!"); 
}); 
server.listen(4000, () => console.log("Server running on port 4000")); 
