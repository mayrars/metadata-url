const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
var admin = require("firebase-admin");
const urlMetadata = require('url-metadata')
var Twitter = require('twitter');
const port = process.env.PORT || 3000
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var serviceAccount = require("./metadata-url-firebase-adminsdk-j7sdi-58dc93e595.json");
var twitterAccount = require("./twitter-keys.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://metadata-url.firebaseio.com"
});
var defaultDatabase = admin.database()
var ref = defaultDatabase.ref('/')

var client = new Twitter({
	consumer_key: twitterAccount.consumer_key,
	consumer_secret: twitterAccount.consumer_secret,
	access_token_key: twitterAccount.access_token,
	access_token_secret: twitterAccount.access_secret
});
var params = { screen_name: 'nodejs' };
app.post('/', urlencodedParser, (req, res) => {
	var data = req.body.urlpage
	compareurl(data).then(
		function (dat){
			urlMetadata(data).then(
				function (metadata) { // success handler
					savemetadata(metadata)
					client.post('statuses/update', { status: data })
						.then(function (tweet) {
							console.log("Tweet Publicado")
						})
						.catch(function (error) {
							console.log(error)
						})
					res.redirect('/')
				},
				function (error) { // failure handler
					res.end(error)
					res.redirect('/')
				})
		},
		function(error){
			console.log("Error")
			setTimeout(function(){
				res.redirect('/')
			},2000)
		}
	);
})

function savemetadata(data) {
    ref.push(data,()=>{
		console.log('Insertado')
	})
}

function compareurl(data){
	return new Promise ((resolve, reject)=>{
		ref.orderByChild('url').startAt(data).endAt(data+"\uf8ff").on("value",(datos)=>{
			if(datos.toJSON()===null)
				 resolve(true)
			reject(false)
		});
	});
}
app.use('/', express.static(__dirname + '/public'))

app.listen(port, () => {
	console.log('Init server')
})
