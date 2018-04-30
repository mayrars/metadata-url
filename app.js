const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
const urlMetadata = require('url-metadata')
const port = process.env.PORT || 3000
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/',urlencodedParser,(req, res)=>{
	var data =  req.body.urlpage
	urlMetadata(data).then(
	function (metadata) { // success handler
		res.end(JSON.stringify(metadata))
	},
	function (error) { // failure handler
		res.end(JSON.stringify(error))
	})
	//res.end(JSON.stringify(data))
})
app.use('/', express.static(__dirname + '/public'))

app.listen(port, () => {
	console.log('Init server')
})