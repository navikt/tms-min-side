import { handler } from "./handler.ts";

Deno.serve({ port: 4000 }, handler);
