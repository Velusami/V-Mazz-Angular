# Backend integration notes

The updated Java project already includes the Angular development origin `http://localhost:4200` in its global CORS configuration and in the AI RAG controller. No additional CORS change is needed when using this supplied backend.

If you deploy the Angular app on another domain, add that exact origin to `CorsConfig.java` and any controller-level `@CrossOrigin` annotations. Do not use `*` for production when sending Authorization headers.

Image upload endpoints:
- `POST /api/v1/profile/image` (authenticated; multipart field `file`)
- `POST /api/v1/admin/items/images` (ADMIN/SUB_ADMIN; multipart field `file`)
