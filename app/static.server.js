var fs = require('fs'),
	mime = require('mime');
	
//modulo encargado de servir contenido estatico
exports.serve = function(url, res){
	
	var staticPath = './static'+url;
	//Verificando si existe
	fs.exists(staticPath,function(exists){
		if(exists){
				//si si existe la ruta	
			fs.readFile(staticPath, function(err,content){
				if(err){
					//Hubo error en la lectura
					res.writeHead(500,{
						"Content-Type":"text/html"
					});
					res.end("<h1 style='color:red'>500 FUERA DE SERVICIO</h1>");
				}else{
					//SEleccionar el mime
					var contentType = mime.lookup(staticPath);
					//NO HUBO ERROR SE SIRVE EL ARCHIVO
					res.writeHead(200,{
						"Content-Type":contentType,
						'Server' : 'ITGAM@1.0.0'
					});
					res.end(content, 'utf-8');
				}
			});
		}else{
			//No existe hamdler
			res.writeHead(404,{
				"Content-Type":"text/html"
			});
			res.end("<h1 style='color:red'>404 NOT FOUND...</h1>");
		}
	});	
};