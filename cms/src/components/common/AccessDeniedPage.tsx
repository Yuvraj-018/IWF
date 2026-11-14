import { ShieldAlert, ArrowLeft, Home, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AccessDeniedPageProps {
  requiredPermission?: string;
  moduleName?: string;
}

export function AccessDeniedPage({ requiredPermission, moduleName }: AccessDeniedPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0b1f3b] border border-[#16365f] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-5 text-orange-400 shadow-lg shadow-orange-500/10">
            <ShieldAlert className="w-8 h-8 text-orange-500" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">Access Restricted</h1>
          <p className="text-sm text-slate-300 mt-2">
            You do not hold the required authorization to view or manage {moduleName || "this section"}.
          </p>

          {requiredPermission && (
            <div className="my-5 p-3 bg-[#071527] border border-[#1c4070] rounded-xl text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                <span>Required System Permission</span>
              </div>
              <code className="text-xs font-mono text-orange-300 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40">
                {requiredPermission}
              </code>
            </div>
          )}

          <div className="p-3 bg-[#071527]/60 border border-[#16365f] rounded-xl text-xs text-slate-400 text-left mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400">Signed in as:</span>
              <span className="text-white font-medium">{user?.name} ({user?.email})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Assigned Roles:</span>
              <span className="text-orange-400 font-semibold">{user?.roles?.join(", ") || "None"}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            If you believe this is in error, contact your Organization Administrator or Super Admin to request role assignment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#071527] hover:bg-[#0c2444] border border-[#1c4070] text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
