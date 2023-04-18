const express = require("express");
const logger = require("./logger");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const basePath = "/minside";
const buildPath = path.resolve(__dirname, "../dist");
const server = express();

server.disable("x-powered-by");

server.use(basePath, express.static(buildPath, { index: false }));

server.get(`${basePath}/internal/isAlive`, async (req, res) => {
  res.sendStatus(200);
});

server.get(`${basePath}/internal/isReady`, async (req, res) => {
  res.sendStatus(200);
});

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  getHtmlWithDecorator(`${buildPath}/index.html`)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    })
);

const port = 8080;
server.listen(port, () => console.info(`Listening on port ${port}`));
