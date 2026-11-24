/**
 * One-time fix for members saved before validity was computed in IST.
 * Moves every member's `validTill` to 23:59:59.999 IST on the last day of its
 * intended month (e.g. 31 Oct 2027 23:59 UTC -> 31 Oct 2027 23:59 IST), so
 * receipts, cards, the CMS and the verification centre no longer show the following month.
 *
 *   npx tsx src/scripts/normalizeMembershipValidity.ts           # dry run: lists changes
 *   npx tsx src/scripts/normalizeMembershipValidity.ts --apply   # writes them
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Member } from "../models/Member.js";
import { Verification } from "../models/Verification.js";
import { endOfIstMonth, expiryYearMonth } from "../utils/dateUtils.js";

dotenv.config();

async function main() {
  const apply = process.argv.includes("--apply");
  await connectDB();

  const members = await Member.find({ validTill: { $exists: true, $ne: null } });
  let changed = 0;
  for (const m of members) {
    const current = new Date(m.validTill);
    const { year, month } = expiryYearMonth(current);
    const fixed = endOfIstMonth(year, month);
    if (fixed.getTime() === current.getTime()) continue;
    changed++;
    console.log(`${m.memberNo}: ${current.toISOString()} -> ${fixed.toISOString()}`);
    if (apply) {
      // updateOne skips validation of unrelated legacy fields; the certificate in the
      // verification centre keeps its own copy of the expiry, so fix that too.
      await Member.updateOne({ _id: m._id }, { $set: { validTill: fixed } });
      await Verification.updateMany({ documentNo: m.memberNo }, { $set: { validTill: fixed } });
    }
  }

  console.log(
    `${changed} of ${members.length} members ${apply ? "updated" : "would change (dry run; add --apply to write)"}.`
  );
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
