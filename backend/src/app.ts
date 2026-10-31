import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js";
import { securitySanitizer } from "./middlewares/securitySanitizer.js";
import { connectDB } from "./config/db.js";

export function createApp() {
  const app = express();

  // Lazy DB connection middleware for serverless environments (e.g. Vercel)
  app.use(async (_req, _res, next) => {
    try {
      await connectDB();
    } catch (err) {
      console.error("[DB Middleware] Connection error:", err);
    }
    next();
  });

  // Security headers: Clickjacking protection, XSS filter, MIME sniffing prevention, Hide X-Powered-By
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      frameguard: { action: "deny" },
      noSniff: true,
      xssFilter: true,
      hidePoweredBy: true,
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow mobile apps, curl, postman, and local dev ports
        if (
          !origin ||
          /^http:\/\/localhost(:\d+)?$/.test(origin) ||
          /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
          (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) ||
          (process.env.CMS_URL && origin === process.env.CMS_URL) ||
          (process.env.ADMIN_URL && origin === process.env.ADMIN_URL)
        ) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive during preview/dev
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-razorpay-signature"],
    })
  );

  // Request body parsing - restricted to 1mb to prevent memory/CPU exhaustion DoS attacks
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  // Security Sanitizer: Neutralizes NoSQL injection and blocks scanner tools
  app.use(securitySanitizer);

  // Logging
  app.use(morgan("dev"));

  // API Routes - strictly mounted at /api
  app.use("/api", apiRouter);

  // Fallback handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}

const app = createApp();
export default app;
