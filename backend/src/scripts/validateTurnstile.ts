import { checkTurnstileToken, createTurnstileMiddleware } from "../middlewares/turnstile.js";

async function runTurnstileValidation() {
  console.log("=================================================");
  console.log("🛡️  CLOUDFLARE TURNSTILE SPIN VALIDATION SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  // Test 1: Verify passing condition with canonical Cloudflare Demo Secret Key
  try {
    const result = await checkTurnstileToken(
      "XXXX.DUMMY.TOKEN.XXXX",
      "1x0000000000000000000000000000000AA",
      "127.0.0.1",
      "test-uuid-1"
    );
    if (result.success) {
      console.log("✅ Test 1 Passed: Demo pass key successfully validates token.");
      passed++;
    } else {
      console.error("❌ Test 1 Failed: Expected success=true, got", result);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 1 Exception:", err);
    failed++;
  }

  // Test 2: Verify failing condition with Cloudflare Demo Fail Key
  try {
    const result = await checkTurnstileToken(
      "dummy-token",
      "2x0000000000000000000000000000000AA",
      "127.0.0.1",
      "test-uuid-2"
    );
    if (!result.success && result["error-codes"]?.includes("invalid-input-response")) {
      console.log("✅ Test 2 Passed: Demo fail key correctly rejects invalid response.");
      passed++;
    } else {
      console.error("❌ Test 2 Failed: Expected rejection, got", result);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 2 Exception:", err);
    failed++;
  }

  // Test 3: Middleware Missing Token Check (HTTP 400 Bad Request)
  try {
    const middleware = createTurnstileMiddleware();
    let statusSent: number | null = null;
    let jsonSent: any = null;
    let nextCalled = false;

    // Simulate request with empty body
    const req: any = {
      body: {},
      headers: {},
      ip: "127.0.0.1",
    };
    const res: any = {
      status: (code: number) => {
        statusSent = code;
        return {
          json: (data: any) => {
            jsonSent = data;
          },
        };
      },
    };
    const next = () => {
      nextCalled = true;
    };

    // Temporarily set a non-demo key to test production-style strict enforcement
    const originalSecret = process.env.TURNSTILE_SECRET_KEY;
    process.env.TURNSTILE_SECRET_KEY = "0x4AAAAAAATestKeyProductionMock";

    await middleware(req, res, next);

    if (statusSent === 400 && jsonSent?.errorCodes?.includes("missing-input-response") && !nextCalled) {
      console.log("✅ Test 3 Passed: Middleware strictly rejects missing tokens with HTTP 400.");
      passed++;
    } else {
      console.error("❌ Test 3 Failed: Expected status 400, got status", statusSent, "json:", jsonSent, "next:", nextCalled);
      failed++;
    }

    // Restore original secret
    process.env.TURNSTILE_SECRET_KEY = originalSecret;
  } catch (err) {
    console.error("❌ Test 3 Exception:", err);
    failed++;
  }

  // Test 4: Middleware Replay / Duplicate Token Error Handling (HTTP 403 Forbidden)
  try {
    const middleware = createTurnstileMiddleware();
    let statusSent: number | null = null;
    let jsonSent: any = null;

    const req: any = {
      body: { turnstileToken: "expired-or-duplicate-token" },
      headers: {},
      ip: "127.0.0.1",
    };
    const res: any = {
      status: (code: number) => {
        statusSent = code;
        return {
          json: (data: any) => {
            jsonSent = data;
          },
        };
      },
    };
    const next = () => {};

    // Temporarily set fail key
    const originalSecret = process.env.TURNSTILE_SECRET_KEY;
    process.env.TURNSTILE_SECRET_KEY = "2x0000000000000000000000000000000AA";

    await middleware(req, res, next);

    if (statusSent === 403 && jsonSent?.success === false) {
      console.log("✅ Test 4 Passed: Middleware rejects failed/replayed verification with HTTP 403 Forbidden.");
      passed++;
    } else {
      console.error("❌ Test 4 Failed: Expected status 403, got status", statusSent, jsonSent);
      failed++;
    }

    process.env.TURNSTILE_SECRET_KEY = originalSecret;
  } catch (err) {
    console.error("❌ Test 4 Exception:", err);
    failed++;
  }

  console.log("\n-------------------------------------------------");
  console.log(`Validation Results: ${passed} passed, ${failed} failed.`);
  console.log("-------------------------------------------------");

  if (failed > 0) {
    process.exit(1);
  }
}

runTurnstileValidation();

