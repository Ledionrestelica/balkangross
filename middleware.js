import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/",
  "/product/:productId",
  "/catalog/:productId",
  "/cart",
  // Add any additional routes here
]); // Update clerkMiddleware to manually protect routes

export default clerkMiddleware((auth, req) => {
  // Allow public access to sign-in and sign-up routes
  const publicRoutes = ["/sign-in", "/sign-up", "/request-account"];
  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    auth().protect(); // Protect the route if it matches the defined criteria
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
