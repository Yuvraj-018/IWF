import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Plus, HeartPulse, Loader2, X, Building2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function PatientsManager() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    age: 12,
    gender: "Male",
    disease: "Acute Lymphoblastic Leukemia",
    hospital: "AIIMS, New Delhi",
    admissionDate: new Date().toISOString().split("T")[0],
    condition: "Critical",
    urgent: true,
    neededAmount: 500000,
    raisedAmount: 50000,
    image: "",
    familyBackground: "Father is an agricultural laborer with no steady income.",
  });

  const loadPatients = () => {
    setLoading(true);
    api.listPatients().then((res) => {
      if (res.success && res.data) {
        setPatients(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.disease || !formData.neededAmount) {
      toast.error("Please fill in patient name, disease, and goal amount.");
      return;
    }

    setSubmitting(true);
    try {
      const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const res = await api.createPatient({
        ...formData,
        slug: generatedSlug,
        verificationId: `MED-VER-${Date.now().toString().slice(-6)}`,
        verifiedBy: "ISLAH Medical Board",
        verificationDate: new Date().toISOString().split("T")[0],
      });

      if (res.success) {
        toast.success(`Patient appeal created: ${formData.name}`);
        setModalOpen(false);
        loadPatients();
      } else {
        toast.error(res.message || "Failed to create patient appeal");
      }
    } catch (err: any) {
      toast.error(err.message || "Error creating case");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Critical Healthcare Appeals</h2>
          <p className="text-xs text-slate-400 mt-1">Manage emergency medical fundraising cases and live progress bars</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-lg shadow-rose-900/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Patient Appeal</span>
        </button>
      </div>

      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-rose-400" />
          <p className="text-xs">Loading patient registry...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No critical patient records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {patients.map((p) => {
            const percent = Math.min(100, Math.round(((p.raisedAmount || 0) / (p.neededAmount || 1)) * 100));
            return (
              <div
                key={p._id || p.slug}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white">
                        {p.condition}
                      </span>
                      {p.urgent && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition">
                        {p.name} ({p.age} Yrs, {p.gender})
                      </h3>
                      <p className="text-xs text-rose-300 font-medium">{p.disease}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{p.hospital}</span>
                      </p>
                    </div>

                    {/* Funding progress */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-emerald-400">₹{(p.raisedAmount || 0).toLocaleString("en-IN")}</span>
                        <span className="text-slate-400">Target: ₹{(p.neededAmount || 0).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 text-right mt-1 font-mono">{percent}% Funded</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">/{p.slug}</span>
                  <a
                    href={`http://localhost:3000/patients/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline font-bold"
                  >
                    View Live Page ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Patient Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-400" />
                <span>Launch New Patient Emergency Appeal</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Aarav Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Age &amp; Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                    />
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Diagnosis / Disease *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute Lymphoblastic Leukemia (Blood Cancer)"
                  value={formData.disease}
                  onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Hospital / Medical Center</label>
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Medical Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Serious">Serious</option>
                    <option value="Stable">Stable</option>
                    <option value="Recovering">Recovering</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.neededAmount}
                    onChange={(e) => setFormData({ ...formData, neededAmount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Initial Raised Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.raisedAmount}
                    onChange={(e) => setFormData({ ...formData, raisedAmount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Publish Appeal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

