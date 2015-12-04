//configurador
var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3000;
//exportando valores de ip y port
exports.IP = ip;
exports.PORT = port;