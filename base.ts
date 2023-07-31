const file = await Deno.readTextFile("./dist/server/entry.mjs");
const text = file.replace(/\"base\":\"\/minside\/\"/i, "\"base\":\"\/minside\"");

Deno.writeTextFile("./dist/server/entry.mjs", text);

export {}
