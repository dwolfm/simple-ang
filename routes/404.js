'use strict';

module.exports = function(router){
	router.all('*', function(req, res){
		res.send('sry bub 404 file not found');
	});
};
