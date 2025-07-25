import { html } from 'hono/html';

export const mockMicrofrontendSSR = (name: string) => (
    html`
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
      `
);