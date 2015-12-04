//importando libreria para parsear datos de la url

var querystring = require('querystring'); 
//importando a mi server estatico
var staticServer = require('./static.server.js');
var aldo = {
	"nombres" : "aldo do nascimento",
	"apellidos" : "gaucho dos santos",
	"edad" : 23,
	"sexo" : "h",
	"puesto" : "el patron"
};

//exportando un modulo como un todo
module.exports = {
	"/" : function(req, res){
		if(req.method == "POST"){
			console.log("> Entregando un POST...");
			//el metodo de peticion es POST
			//preparo una variable para guardar la informacion del formulario
			var postData = "";
			//Crear listeners
			req.on('data', function(dataChunks){
				postData += dataChunks;
				//seguridad
				if(postData.length > 1e6){
					//si la informacion excede cierta cantidad, la destruyo por seguridad
					req.connection.destroy();
					//Se cancela por exceso de carga
					console.log("> Se cancela la peticion por exceso de informacion en la peticion...");
				}
			});
			
			//Creamos un listener que indique cualdo termino la tranferecia
			req.on('end', function(){
				var data = querystring.parse(postData);
				//servir html hardcodeado
				res.writeHead(200, {
					"Content-Type" : "text/html"
				});
				
				res.write('Estimado '+  data["nombre"] + ', ha quedado inscrito a ' + data["curso"]);
				res.end();
			});
			
		}else{
			//Asumo que es GET
			console.log("> Entra a GET...");
			staticServer.serve('/index.html',res);
		}
	},
	
	"/index" : function(req, res){
		if(req.method == "POST"){
			console.log("> Entregando un POST...");
			//el metodo de peticion es POST
			//preparo una variable para guardar la informacion del formulario
			var postData = "";
			//Crear listeners
			req.on('data', function(dataChunks){
				postData += dataChunks;
				//seguridad
				if(postData.length > 1e6){
					//si la informacion excede cierta cantidad, la destruyo por seguridad
					req.connection.destroy();
					//Se cancela por exceso de carga
					console.log("> Se cancela la peticion por exceso de informacion en la peticion...");
				}
			});
			
			//Creamos un listener que indique cualdo termino la tranferecia
			req.on('end', function(){
				var data = querystring.parse(postData);
				//servir html hardcodeado
				res.writeHead(200, {
					"Content-Type" : "text/html"
				});
				res.write('<ul style = "color:blue">');
				for(var key in data){
					if(data.hasOwnProperty(key)){
						//Si existe respondemos
						//res.write('<li style = "color:red">' + key.toString().toUpperCase() + ':' + data[key] + '</li>');
						res.write('<h1>Estimado </h1>'+  data[key] + ', ha quedado inscrito a ' + data[key]);
					}
				}
				res.write('/<ul>');
				res.end();
			});
			
		}else{
			//Asumo que es GET
			console.log("> Entra a GET...");
			staticServer.serve('/index.html',res);
		}
	},
	
	
	
	"/aldo" : function(req, res){
		//manejador de ruta /aldo
		res.writeHead(200,{
			"Content-Type" : "application/json"
		});
		//serializando la respuesta
		var jsonResponse = JSON.stringify(aldo);
		//contesto con el json
		res.end(jsonResponse)
	},
	"/aldo/gustos" : function(req, res){
		//manejador de ruta ivan/-gustos
		res.writeHead(200,{
			"Content-Type" : "text/plain"
		});
		res.end('Ruta /ivan/gustos en construccion...');
	}
};

