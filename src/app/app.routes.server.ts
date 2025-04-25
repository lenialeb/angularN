// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];
// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'layout/productDetails/:id', // Dynamic route for product details
    renderMode: RenderMode.Server, // Use Server for SSR to handle dynamic data
  },
  {
    path: 'layout/updatePro/:id', // Dynamic route for updating a product
    renderMode: RenderMode.Server, // Use Server for SSR
  },
  {
    path: 'layout/updateUser/:id', // Dynamic route for updating a user
    renderMode: RenderMode.Server, // Use Server for SSR
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server, // Keep this as Server for other routes
  },
];