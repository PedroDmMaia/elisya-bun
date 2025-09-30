import { Elysia } from "elysia";
import { openapi } from '@elysiajs/openapi'
import { z } from 'zod'
import { betterAuthPlugin, OpenAPI } from "./http/plugins/better-auth";

const app = new Elysia()
  .use(openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths()
    }
  }))
  .use(betterAuthPlugin)
  .get("/", () => "Hello Elysia")
  .get('user/:id', ({ params }) => {
    const { id } = params

    return {
      id,
      name: 'Elysia'
    }
  }, {
    detail: {
      summary: 'Get user by ID',
      description: 'Retrieve user information using their unique ID.',
      tags: ['User']
    },
    params: z.object({
      id: z.string()
    }),
    response: {
      200: z.object({
        id: z.string(),
        name: z.string()
      })
    }
  })
  .listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
