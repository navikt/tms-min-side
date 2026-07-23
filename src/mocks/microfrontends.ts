import type { MockDefinition } from "@navikt/astro-mocks";

const mockMicrofrontendHtml = (name: string) => `
<div class="container">
    <h3>${name}</h3>
</div>
<style>
  .container {
      border: 4px dashed lightgray;
      background: white;
      text-align: center;
      margin-bottom: 1rem;
      padding: 1rem;
  }
</style>
`;

export const microfrontendMocks: MockDefinition[] = [
  {
    path: "/meldekort/:path",
    handler: () =>
      new Response(mockMicrofrontendHtml("Meldekort"), {
        headers: { "content-type": "text/html" },
      }),
  },
  {
    path: "/pensjonskalkulator/:path",
    handler: () =>
      new Response(mockMicrofrontendHtml("Pensjonskalkulator"), {
        headers: { "content-type": "text/html" },
      }),
  },
  {
    path: "/syfo-dialog/:path",
    handler: () =>
      new Response(mockMicrofrontendHtml("Syfo dialog"), {
        headers: { "content-type": "text/html" },
      }),
  },
  {
    path: "/aap/:path",
    handler: () =>
      new Response(mockMicrofrontendHtml("AAP"), {
        headers: { "content-type": "text/html" },
      }),
  },
];
