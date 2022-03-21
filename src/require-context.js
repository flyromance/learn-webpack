const req = require.context('./lib/add', true, /\.js$/);

req.keys().map(req.resolve).map(req);