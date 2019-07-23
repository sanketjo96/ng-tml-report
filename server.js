//Install express server
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/ng-tml-app'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/ng-tml-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port);
console.log(`Ng-tml-app starts at ${port}`);