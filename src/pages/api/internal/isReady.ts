import type { APIRoute } from "astro";

export const get: APIRoute = async function get({ params, request }) {
  return new Response(null, { status: 200 });
};
