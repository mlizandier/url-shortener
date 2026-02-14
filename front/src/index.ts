import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: 3001,
  routes: {
    "/:shortCode": {
      async GET(req) {
        const shortCode = req.params.shortCode;

        try {
          const apiUrl = process.env.API_URL || 'http://localhost:3000';
          const response = await fetch(`${apiUrl}/short-urls/${shortCode}`);

          if (response.ok) {
            const data = await response.json();
            return Response.redirect(data.originalUrl, 302);
          }
        } catch (error) {
          console.error(error);
        }

        return new Response(null, { status: 404 });
      },
    },
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
