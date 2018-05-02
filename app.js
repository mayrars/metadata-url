const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
var admin = require("firebase-admin");
const urlMetadata = require('url-metadata')
const port = process.env.PORT || 3000
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var serviceAccount = require("./metadata-url-firebase-adminsdk-j7sdi-58dc93e595.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://metadata-url.firebaseio.com"
});
var defaultDatabase = admin.database()
var ref = defaultDatabase.ref('/')
app.post('/', urlencodedParser, (req, res) => {
	var data = req.body.urlpage
	urlMetadata(data).then(
		function (metadata) { // success handler
			savemetadata(metadata)
		},
		function (error) { // failure handler
			res.end(error)
		})
})

function savemetadata(data) {
    ref.push(data,()=>{
		console.log('Insertado')
	})
}
app.use('/', express.static(__dirname + '/public'))

app.listen(port, () => {
	console.log('Init server')
})
