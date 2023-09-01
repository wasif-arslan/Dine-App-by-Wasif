import { authMiddleware } from "@clerk/nextjs";



export default authMiddleware({
    // "/" will be accessible to all users
   // publicRoutes: ["/","/products","/products/:path*", "/male", "/female", "/kids", "/api/webhooks/:path*", "/studio/:path*","/api/products/:path*","/api/cart/null",],
    publicRoutes: ["/" ,"/Category/Female","/Category/Male","/Category/Kids","/AllProducts","/api/cart/null"]

});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/api/cart:path*"],
};