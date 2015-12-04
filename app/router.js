//importando handlers
var handlers = 
	require('./handlers'),
	staticServer = require('./static.server');
	
var fs = require('fs');
	
	exports.route = function(url, req, res){
		console.log(">Enrutando la peticion" + "%s", url);
		
		//Verificando si la ruta que se desea servir es content-static
		
		//verificar si existe un manejador para la url
		//que se pide
		if(typeof(handlers[url]) ==='function'){
			console.log("> Encuentra ruta...");
			//existe el handler
			//enrutando url con su handler
			handlers[url](req, res)
		}else{
			//Si si existe esta ruta
					//mandamos a servir la ruta estatica
					staticServer.serve(url, res);
		}
	};