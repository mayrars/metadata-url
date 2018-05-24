# Metadata

Obtiene los metadatos de una URL, registra los datos en una DB de firebase y realiza la publicación en Twitter


### Tech

Metadata hace uso de los siguientes paquetes para funcionar:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Firebase-Admin] - access to Firebase services from privileged environments
* [Request]- Request emits a "response" event when a response is received. 
* [Twitter] - Post twitter

### Installation
Metadata requiere [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd metadata-url
$ npm install
$ node metadata-url
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node metadata-url
```

License
----

MIT


**Free Software, Hell Yeah!**

