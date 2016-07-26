var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', 3000);
var fs = require('fs');


app.get('/secure',function(req,res){
	var requireNew = require('require-new');
	var code = requireNew('./code.json');

    if(req.headers.authorization === code[0].code && code[0].code==="123456"){
		
		res.send({message:"secure page accessed with headers token. expires in 10 seconds - try to refresh"});
	}else{
		res.send({message:"error"});
	}
	setTimeout(function(){
	  fs.writeFile('./code.json', JSON.stringify([{code:"expired"}]), function (err) {
	   if(err){console.log(err)};
	 }); 
	}, 10000);

})

app.post('/signin', function(req , res){
	if(req.body.name === "me" && req.body.password==="password"){
	
	fs.writeFile('./code.json', JSON.stringify([{code:"123456"}]), function (err) {
	  if(err){console.log(err)};
	});

		res.send({ secret:'123456' });
	}else{
		res.status(404).send("error");
	}
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
