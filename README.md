# RAJA Atelier — Luxury Menswear E-Commerce

A functional luxury menswear e-commerce frontend demo, built with React and modern frontend tooling. No backend — all data is persisted in the browser via localStorage.

---

## Live Demo

🔗 [raja-atelier.vercel.app](https://raja-atelier.vercel.app)

**Demo credentials:**

- Email: `abdur.rahman@gmail.com`
- Password: `demo1234`
- Promo Codes: `RAJA10` · `WELCOME20` · `FREESHIP`

---

## Features

### Shopping Experience

- 52 luxury menswear products across 10 categories
- Filter by category, sort by price or rating, full-text search
- New Arrivals and Bestsellers sections with dynamic filtering
- Product detail page with quantity selector, wishlist, and Buy Now
- Related products section on each product page

### Cart & Wishlist

- Slide-out cart panel (right on desktop, bottom sheet on mobile)
- Wishlist with add to bag and remove confirmation
- Cart and wishlist persisted in localStorage across sessions
- Load More pagination on wishlist page

### Checkout

- 3-step checkout: Shipping → Payment → Review
- Promo code support (percentage off and free shipping)
- Multiple shipping methods (Standard, Express, Same Day)
- Order saved to localStorage after placement

### Auth & Account

- Login and Register with form validation
- Forgot password flow (frontend demo)
- Protected routes — redirects to login, returns to intended page after
- Account page with tabs: Profile, Orders, Wishlist, Change Password
- Order history with expandable order cards
- Profile editing with save/cancel
- Password change with strength indicator
- All user data persisted in localStorage

### UI & UX

- Fully responsive — mobile, tablet, and desktop
- Dynamic page titles on every page
- Scroll to top on every route change
- Active nav link highlighting
- Image loading shimmer placeholders with error fallback
- Loading states on all data sections and form submissions
- Demo intro modal on first visit
- Branded page loader on initial app load
- Toast notifications for all user actions
- Delete confirmation dialogs

### Pages

| Route                 | Page                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------- |
| `/`                   | Home — Hero, New Arrivals, Categories, Bestsellers, Testimonials, Instagram, Newsletter |
| `/product/:id`        | Product Detail                                                                          |
| `/wishlist`           | Wishlist                                                                                |
| `/checkout`           | Checkout (protected)                                                                    |
| `/order-confirmation` | Order Confirmation                                                                      |
| `/account`            | My Account (protected)                                                                  |
| `/about`              | About Us                                                                                |
| `/contact`            | Contact                                                                                 |
| `/faq`                | FAQ                                                                                     |
| `/login`              | Login                                                                                   |
| `/register`           | Register                                                                                |
| `/forgot-password`    | Forgot Password                                                                         |
| `*`                   | 404 Not Found                                                                           |

---

## Tech Stack

| Category         | Technology                                  |
| ---------------- | ------------------------------------------- |
| Framework        | React 18                                    |
| Build Tool       | Vite                                        |
| Styling          | Tailwind CSS v4                             |
| Components       | shadcn/ui + Radix UI                        |
| Routing          | React Router v6                             |
| Icons            | Lucide React                                |
| Notifications    | Sonner                                      |
| Page Titles      | react-helmet-async                          |
| Data Persistence | localStorage (cart, wishlist, auth, orders) |

---

## Project Structure

```
src/
├── components/
│   ├── account/       # AccountSidebar, ProfileTab, OrdersTab, OrderCard, WishlistTab, ChangePasswordTab
│   ├── checkout/      # StepIndicator, ShippingStep, PaymentStep, ReviewStep, OrderSummary
│   ├── home/          # NewArrivals, FeaturedCategories, Bestsellers, Testimonials, Newsletter, InstagramBanner
│   ├── layout/        # Header, Footer, Hero
│   ├── shared/        # Badge, CartPanel, ConfirmDialog, FilterSheet, ImageLoader, PageLoader, PageTitle, ProductCard, ProtectedRoute, ScrollToTop, Spinner, DemoModal
│   └── ui/            # shadcn auto-generated components
├── data/              # products, about, contact, faq, checkout, home, orderConfirmation
├── hooks/             # useAuth, useCart, useWishlist, useOrders, useWidth
├── layouts/           # Layout (shared Header + Footer + Cart wrapper)
├── lib/               # utils (cn helper)
├── pages/             # All 13 page components
└── main.jsx
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/minhaj-ul/raja-atelier.git

# Navigate into the project
cd raja-atelier

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser at
http://localhost:5173
```

---

## Notes

- All data is stored in `localStorage` — clear browser storage to reset
- No real payments are processed — this is a frontend demo only
- No real emails are sent for password reset
- Images are from Unsplash
