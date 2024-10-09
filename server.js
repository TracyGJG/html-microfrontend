import http from 'http';
import path from 'path';
import fs from 'fs';

import MIME_TYPES from './mime-types.json' with { type: 'json'};

const host = '127.0.0.1';
const port = 8080;
const source = process.argv?.[2] || 'public';

const httpServer = http.createServer(httpHandler);

httpServer.listen(port, host, () => {
	console.log(`HTTP server running at http://${host}:${port}/`);
});

function httpHandler(req, res) {
	const sourceFile = path.join(
		process.cwd(),
		source,
		req.url.trim().at(-1) === `/` ? `${req.url}index.html` : req.url
	);
	const mimeType = sourceFile.split(/\./).reverse()[0];
	console.log(`Serving: ${sourceFile}`);
	fs.readFile(sourceFile, function (err, data) {
		if (err == null) {
			res.writeHead(200, { 'Content-Type': MIME_TYPES[mimeType] });
			res.write(data);
			res.end();
		}
	});
}
