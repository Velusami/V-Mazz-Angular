# V-Mazz Angular Marketplace

Angular 20 frontend for the supplied V-Mazz Spring Boot application. Includes the V-Mazz logo, responsive marketplace UI, Angular routing, JWT authentication, customer purchasing, supplier administration and AI sourcing tools.

## Requirements
- Node.js 20.19+ or 22.12+
- npm
- V-Mazz Spring Boot API running at `http://localhost:8080`

## Run
```bash
npm install
npm start
```
Open `http://localhost:4200`.

## Implemented routes
| Route | Access | Features |
|---|---|---|
| `/` | Public | Product catalog, category/search/stock filters, add to cart |
| `/login` | Public | JWT sign-in, user role routing |
| `/register` | Public | Customer and supplier-company registration |
| `/cart` | CUSTOMER | View/update/remove/clear cart |
| `/checkout` | CUSTOMER | Shipping/contact/payment and checkout |
| `/orders` | CUSTOMER | List, view and cancel eligible purchase orders |
| `/supplier/items` | ADMIN, SUB_ADMIN | Create/update/deactivate products, stock update |
| `/supplier/orders` | ADMIN, SUB_ADMIN | Supplier order list and status updates |
| `/supplier/users` | ADMIN | Create/update/activate/deactivate sub-users |
| `/supplier/company` | ADMIN | View and update company profile |
| `/ai` | Public | Agent chat, hybrid/intelligent/Elasticsearch/RAG search, alternates and BOM JSON/CSV matching |

## Backend API mapping
The frontend uses the actual controller routes and DTO field names found in the supplied backend source:
- `/auth/login`, `/auth/register-customer`, `/auth/register-company`, `/auth/me`
- `/catalog/items`, `/catalog/items/{id}`, `/catalog/categories`, `/catalog/uoms`
- `/cart`, `/cart/items`, `/cart/items/{itemId}`
- `/orders/checkout`, `/orders`, `/orders/{id}`, `/orders/{id}/cancel`
- `/admin/items`, `/admin/items/{id}`, `/admin/items/{id}/stock`
- `/admin/orders`, `/admin/orders/{id}`, `/admin/orders/{id}/status`
- `/admin/users`, `/admin/users/{id}`, `/admin/users/{id}/status`, `/admin/company`
- `/ai/agent/chat`, `/ai/agent/memory/{conversationId}`, `/ai/ask`, `/ai/products/rag`, `/ai/products/hybrid-search`, `/ai/products/intelligent-search`, `/ai/products/alternates`, `/ai/bom/match`, `/ai/bom/match/csv`, `/products/search`

The API base URL is in `src/app/api.service.ts`.

## Required backend CORS change
Your uploaded backend currently allows only `http://localhost:5173`. Angular runs on `http://localhost:4200`, so add that origin in:

1. `src/main/java/com/example/catalog/config/CorsConfig.java`

```java
.allowedOrigins("http://localhost:5173", "http://localhost:4200")
```

2. `src/main/java/com/example/catalog/controller/ProductRagController.java`

```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4200"})
```

Restart Spring Boot after this change. Other AI endpoints use the global CORS configuration.

## Notes
- The JWT is stored in browser local storage and attached as `Authorization: Bearer ...` by the HTTP interceptor.
- Login calls `/auth/me` on protected route navigation and uses the backend role claim to protect customer/supplier/admin pages.
- Customer checkout payload follows the backend `CheckoutRequest`; company and product forms follow the supplied Java records.
- AI BOM JSON uses `{ "rows": [{ "reference", "description", "mpn", "manufacturer", "quantity" }], "includeAlternates": true }`.
- No live backend credentials or API response values are bundled. Run with your backend and test using your own accounts.


## Latest storefront and backend additions
- Zepto-inspired responsive storefront, category tiles, product cards, search and cart quantity badge.
- Profile photo upload and product image upload are stored by the Spring Boot backend under `VMAZZ_UPLOAD_DIR` (default `./uploads`) and the returned URL is saved in the user/item database row.
- Purchase-order View now renders item-level details and item images; workspace pages include a Dashboard link.
- Registration and admin-created sub-user welcome emails are sent when SMTP is configured.

### Email configuration (backend `application.properties` / environment)
Set `VMAZZ_EMAIL_ENABLED=true`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, and `MAIL_PASSWORD`. Without these settings registration still works; email sending is disabled.

### Image upload limits
JPG, PNG, WEBP and GIF; maximum 5 MB per image. In production, set `VMAZZ_UPLOAD_DIR` to a persistent disk or object-storage mount and serve `/uploads/**` over HTTPS. Do not use an ephemeral container filesystem for production uploads.

### API response and image behavior
- API validation/authentication/business errors are displayed from the backend `message`/`detail` response where available; successful create/update actions show a confirmation in the page.
- Product image upload: `POST /api/v1/admin/items/images` (multipart `file`), then the returned `imageUrl` is saved with the item create/update request.
- Profile image upload: `POST /api/v1/profile/image` (multipart `file`); the backend saves the image URL against the logged-in user and returns the updated profile.
- Purchase-order View displays its line items, item images, quantity, unit price, tax and total.
