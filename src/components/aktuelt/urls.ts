import { getEnvironment } from "@utils/server/environment";

const AKTUELT_URL = {
    local: "http://localhost:3000/aktuelt",
    dev: "http://tms-mikrofrontend-selector/aktuelt",
    prod: "http://tms-mikrofrontend-selector/aktuelt",
};

export const aktueltUrl = AKTUELT_URL[getEnvironment()];
