import { logAudit } from "./auditService.js";

export interface WorkflowTransitionParams {
  entityType: "expense" | "content" | "refund" | "impact" | "transparency";
  currentState: string;
  targetState: string;
  actor: {
    id: string;
    email: string;
    name: string;
    roles?: string[];
  };
  record: {
    id?: string;
    createdBy?: string;
    submittedBy?: string;
    [key: string]: any;
  };
  breakGlassReason?: string;
}

// Valid state machine transitions
const WORKFLOW_STATE_MACHINES: Record<string, Record<string, string[]>> = {
  expense: {
    draft: ["submitted", "cancelled"],
    submitted: ["approved", "returned", "rejected"],
    returned: ["submitted", "cancelled"],
    approved: ["paid", "cancelled", "returned"],
    paid: ["reconciled", "reversed"],
    rejected: [],
    cancelled: [],
    reversed: [],
  },
  content: {
    draft: ["submitted", "archived"],
    submitted: ["under_review", "rejected", "changes_requested"],
    under_review: ["approved", "changes_requested", "rejected"],
    changes_requested: ["submitted", "draft", "archived"],
    approved: ["published", "scheduled", "archived"],
    scheduled: ["published", "archived"],
    published: ["archived", "draft"],
    archived: ["draft"],
    rejected: ["draft"],
  },
  refund: {
    requested: ["approved", "rejected"],
    approved: ["processed", "failed", "rejected"],
    processed: [],
    rejected: [],
    failed: ["approved", "rejected"],
  },
  impact: {
    draft: ["submitted"],
    submitted: ["approved", "rejected"],
    approved: ["published"],
    published: ["draft"],
    rejected: ["draft"],
  },
};

/**
 * Enforces strict Separation of Duties:
 * An actor cannot approve, reject, pay, reverse, or self-publish a record they created or submitted.
 */
export function checkSeparationOfDuties(
  action: "approve" | "reject" | "pay" | "reverse" | "publish",
  actor: { id: string; email: string; name: string; roles?: string[] },
  record: { createdBy?: string; submittedBy?: string; id?: string },
  breakGlassReason?: string
): { allowed: boolean; reason?: string; breakGlassUsed?: boolean } {
  const creator = record.createdBy || record.submittedBy;

  if (!creator) {
    return { allowed: true };
  }

  const isCreator =
    creator === actor.id ||
    creator === actor.email ||
    creator === actor.name ||
    creator.toLowerCase() === actor.email.toLowerCase() ||
    creator.toLowerCase() === actor.name.toLowerCase();

  if (isCreator) {
    // Check if break-glass override is permitted and provided
    const breakGlassAllowed = process.env.BREAK_GLASS_ALLOWED === "true";
    const isSuperAdmin = actor.roles?.includes("super_admin");

    if (breakGlassAllowed && isSuperAdmin && breakGlassReason && breakGlassReason.trim().length >= 10) {
      logAudit({
        actor,
        action: "governance.break_glass:use",
        resourceType: "separation_of_duties",
        resourceId: record.id || null,
        outcome: "success",
        severity: "critical",
        reason: `Break-glass override by Super Admin for action "${action}": ${breakGlassReason}`,
      });

      return {
        allowed: true,
        reason: `Break-glass authorized: ${breakGlassReason}`,
        breakGlassUsed: true,
      };
    }

    return {
      allowed: false,
      reason: `Separation of Duties Violation: You cannot ${action} a record created or submitted by yourself. Another authorized staff member must review this record.`,
    };
  }

  return { allowed: true };
}

/**
 * Unified Workflow Transition Validator
 * Evaluates: (1) State Machine Edge, (2) Separation of Duties Policy
 */
export function validateWorkflowTransition(params: WorkflowTransitionParams): {
  valid: boolean;
  error?: string;
  breakGlassUsed?: boolean;
} {
  const { entityType, currentState, targetState, actor, record, breakGlassReason } = params;

  // 1. Verify State Machine transition
  const machine = WORKFLOW_STATE_MACHINES[entityType];
  if (machine) {
    const allowedTargets = machine[currentState] || [];
    if (!allowedTargets.includes(targetState)) {
      return {
        valid: false,
        error: `Invalid workflow transition: Cannot transition ${entityType} from "${currentState}" to "${targetState}". Allowed transitions: [${allowedTargets.join(", ")}].`,
      };
    }
  }

  // 2. Verify Separation of Duties for sensitive target states
  const sensitiveActions: Record<string, "approve" | "reject" | "pay" | "reverse" | "publish"> = {
    approved: "approve",
    rejected: "reject",
    paid: "pay",
    reversed: "reverse",
    published: "publish",
  };

  const action = sensitiveActions[targetState];
  if (action) {
    const sodCheck = checkSeparationOfDuties(action, actor, record, breakGlassReason);
    if (!sodCheck.allowed) {
      return {
        valid: false,
        error: sodCheck.reason,
      };
    }
    return { valid: true, breakGlassUsed: sodCheck.breakGlassUsed };
  }

  return { valid: true };
}

/**
 * Checks for conflicting role assignments that create toxic authorization combinations
 */
export function checkConflictingRoles(roles: string[]): {
  hasConflict: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  const hasFinanceEntry = roles.includes("finance_entry");
  const hasFinanceApprover = roles.includes("finance_approver");
  if (hasFinanceEntry && hasFinanceApprover) {
    warnings.push(
      "Combination Warning: Assigning both Finance Entry and Finance Approver gives this user authority to create and approve financial records. The system will enforce Separation of Duties on each individual voucher."
    );
  }

  const hasContentEditor = roles.includes("content_editor");
  const hasContentApprover = roles.includes("content_approver");
  if (hasContentEditor && hasContentApprover) {
    warnings.push(
      "Combination Warning: Assigning both Content Editor and Content Approver allows drafting and publishing. Self-approval of authored content will be blocked by policy."
    );
  }

  return {
    hasConflict: warnings.length > 0,
    warnings,
  };
}

