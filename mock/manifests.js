// eslint-disable-next-line no-undef
const oversiktManifest = require("./manifests/oversikt.json");
// eslint-disable-next-line no-undef
const tjenesterManifest = require("./manifests/tjenester.json");

export default [
  {
    url: "/oversikt/manifest.json",
    method: "get",
    response: () => {
      return oversiktManifest;
    },
  },
  {
    url: "/tjenester/manifest.json",
    method: "get",
    response: () => {
      return tjenesterManifest;
    },
  },
];
