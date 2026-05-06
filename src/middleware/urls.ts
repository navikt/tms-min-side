import { REDIRECT_URI } from 'astro:env/server';

export const loginUrl = `/minside/oauth2/login?redirect=${REDIRECT_URI}`;
