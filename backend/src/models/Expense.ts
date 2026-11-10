import mongoose, { Schema, Document, Types } from "mongoose";

export type ExpenseStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "returned"
  | "rejected"
  | "cancelled";

export type ExpensePaymentStatus = "unpaid" | "paid";

export interface IExpensePayee {
  name: string;
  pan?: string;
  gstin?: string;
  bankDetails?: string;
}

export interface IExpensePayment {
  status: ExpensePaymentStatus;
  date?: Date;
  method?: string;
  bankAccountId?: Types.ObjectId;
  reference?: string;
}

export interface IExpenseApproval {
  status: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  comments?: string;
}

export interface IExpense extends Document {
  expenseNo: string;
  voucherNo?: string;
  date: Date;
  amountPaise: number;
  head: string;
  workAreaId: string;
  initiativeId?: string;
  payee: IExpensePayee;
  invoiceRef?: string;
  description: string;
  evidenceUrls: string[];
  status: ExpenseStatus;
  payment: IExpensePayment;
  approval: IExpenseApproval;
  reversalOf?: Types.ObjectId;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    expenseNo: { type: String, required: true, unique: true, index: true },
    voucherNo: { type: String },
    date: { type: Date, required: true, index: true },
    amountPaise: { type: Number, required: true, min: 1 },
    head: { type: String, required: true, index: true },
    workAreaId: { type: String, required: true, index: true },
    initiativeId: { type: String, index: true },
    payee: {
      name: { type: String, required: true },
      pan: { type: String },
      gstin: { type: String },
      bankDetails: { type: String },
    },
    invoiceRef: { type: String },
    description: { type: String, required: true },
    evidenceUrls: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "returned", "rejected", "cancelled"],
      default: "draft",
      index: true,
    },
    payment: {
      status: { type: String, enum: ["unpaid", "paid"], default: "unpaid", index: true },
      date: { type: Date },
      method: { type: String },
      bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount" },
      reference: { type: String },
    },
    approval: {
      status: { type: String, default: "pending" },
      reviewedBy: { type: String },
      reviewedAt: { type: Date },
      comments: { type: String },
    },
    reversalOf: { type: Schema.Types.ObjectId, ref: "Expense" },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

ExpenseSchema.index({ status: 1, date: -1 });
ExpenseSchema.index({ workAreaId: 1, date: -1 });

ExpenseSchema.pre("save", function () {
  if (!this.voucherNo && this.expenseNo) {
    this.voucherNo = this.expenseNo;
  }
});

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

