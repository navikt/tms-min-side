// eslint-disable-next-line no-undef
const oversiktManifest = require("./manifests/oversikt.json");

export default [
  {
    url: "/oversikt/manifest.json",
    method: "get",
    response: () => {
      return oversiktManifest;
    },
  },
];
