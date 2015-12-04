//cargando router
var router = require('./app/router'),
	server = require("./app/server");
//iniciando el server y pasandole
//como parametro el router
server.startServer(router);