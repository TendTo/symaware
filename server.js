//Install express server
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express()

// Default to SSL version
app.use(sslRedirect.default())

// Compress requests for faster loading
app.use(compression())

// Pre-render
app.use(require('prerender-node'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/assets/deliverables'))

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080)
