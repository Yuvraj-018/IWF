import { useState, useEffect } from "react";
import { api } from "../services/api";
import { getClientUrl } from "../services/config";
import { Plus, HeartPulse, Loader2, X, Building2, AlertTriangle, RefreshCw, Upload, Link as LinkIcon, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_PATIENT_FORM = {
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
};

export default function PatientsManager() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoMode, setPhotoMode] = useState<"file" | "url">("file");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState(DEFAULT_PATIENT_FORM);

  const handleOpenCreate = () => {
    setEditingPatient(null);
    setFormData({
      ...DEFAULT_PATIENT_FORM,
      admissionDate: new Date().toISOString().split("T")[0],
    });
    setPhotoPreview(null);
    setModalOpen(true);
  };

  const handleEdit = (p: any) => {
    setEditingPatient(p);
    setFormData({
      slug: p.slug || "",
      name: p.name || "",
      age: p.age || 0,
      gender: p.gender || "Male",
      disease: p.disease || "",
      hospital: p.hospital || "",
      admissionDate: p.admissionDate ? p.admissionDate.split("T")[0] : new Date().toISOString().split("T")[0],
      condition: p.condition || "Critical",
      urgent: !!p.urgent,
      neededAmount: p.neededAmount || 0,
      raisedAmount: p.raisedAmount || 0,
      image: p.image || "",
      familyBackground: p.familyBackground || "",
    });
    setPhotoPreview(p.image || null);
    setModalOpen(true);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete patient appeal for "${name}"?`)) return;
    try {
      const res = await api.deletePatient(slug);
      if (res.success) {
        toast.success("Patient appeal deleted from database");
        setPatients(patients.filter((p) => p.slug !== slug));
      } else {
        toast.error(res.message || "Failed to delete patient");
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadingPhoto(true);
    setPhotoPreview(URL.createObjectURL(file));
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setFormData((prev) => ({ ...prev, image: res.file?.url || "" }));
        toast.success("Patient photo uploaded successfully!");
      } else {
        toast.error(res.message || "Failed to upload photo");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload error");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const loadPatients = (force = false) => {
    setLoading(true);
    api.listPatients({ force }).then((res) => {
      if (res.success && res.data) {
        setPatients(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadPatients(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.disease || !formData.neededAmount) {
      toast.error("Please fill in patient name, disease, and goal amount.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingPatient) {
        const res = await api.updatePatient(editingPatient.slug, formData);
        if (res.success) {
          toast.success(`Patient appeal updated: ${formData.name}`);
          setModalOpen(false);
          loadPatients(true);
        } else {
          toast.error(res.message || "Failed to update patient");
        }
      } else {
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
          loadPatients(true);
        } else {
          toast.error(res.message || "Failed to create patient appeal");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Error submitting case");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#071527]">Critical Healthcare Appeals</h2>
          <p className="text-xs text-slate-500 mt-1">Manage emergency medical fundraising cases and live progress bars</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadPatients(true)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Bypass cache and sync live with MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Patient Appeal</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <p className="text-xs">Loading patient registry...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-2xs">
          No critical patient records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {patients.map((p) => {
            const percent = Math.min(100, Math.round(((p.raisedAmount || 0) / (p.neededAmount || 1)) * 100));
            return (
              <div
                key={p._id || p.slug}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                        {p.condition}
                      </span>
                      {p.urgent && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs">
                          <AlertTriangle className="w-3 h-3" /> Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-base font-extrabold text-[#071527] transition">
                        {p.name} <span className="text-xs font-bold text-slate-500">({p.age} Yrs, {p.gender})</span>
                      </h3>
                      <div className="mt-1">
                        <span className="inline-block text-xs text-rose-700 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                          {p.disease}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5 mt-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{p.hospital}</span>
                      </p>
                    </div>

                    {/* Financial Requirement */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Medical Aid Needed
                      </span>
                      <span className="text-base font-black text-orange-600">
                        ₹{(p.neededAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/70">
                  <a
                    href={`${getClientUrl()}/patients/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-700 hover:underline font-bold flex items-center gap-1 font-mono truncate max-w-[150px]"
                  >
                    <span>/{p.slug}</span>
                    <span>↗</span>
                  </a>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(p)}
                      title="Edit patient appeal"
                      className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p.slug, p.name)}
                      title="Delete appeal"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New / Edit Patient Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500" />
                <span>{editingPatient ? "Edit Patient Emergency Appeal" : "Launch New Patient Emergency Appeal"}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Aarav Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Age &amp; Gender</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                      />
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Diagnosis / Disease *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acute Lymphoblastic Leukemia (Blood Cancer)"
                    value={formData.disease}
                    onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Hospital / Medical Center</label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Medical Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    >
                      <option value="Critical">Critical</option>
                      <option value="Serious">Serious</option>
                      <option value="Stable">Stable</option>
                      <option value="Recovering">Recovering</option>
                      <option value="Discharged">Discharged</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target / Medical Aid Needed (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 125000"
                    value={formData.neededAmount}
                    onChange={(e) => setFormData({ ...formData, neededAmount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-orange-500"
                  />
                </div>

                {/* Patient Photo (Dual Mode: Direct File Upload or Paste URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-slate-700 font-bold">Patient Photo *</label>
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setPhotoMode("file")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          photoMode === "file" ? "bg-rose-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoMode("url")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          photoMode === "url" ? "bg-rose-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  {photoMode === "file" ? (
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-4 bg-slate-50/70 hover:bg-rose-50/20 text-center transition group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />

                      {formData.image || photoPreview ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <img
                              src={photoPreview || formData.image}
                              alt="Patient Preview"
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                            />
                            <div>
                              <p className="text-slate-900 font-bold text-xs truncate max-w-[220px]">
                                {uploadingPhoto ? "Uploading to Cloud..." : "Photo Ready"}
                              </p>
                              <span className="text-[10px] text-rose-600 font-semibold">
                                {uploadingPhoto ? "Please wait..." : "Click to change photo"}
                              </span>
                            </div>
                          </div>
                          {uploadingPhoto ? (
                            <Loader2 className="w-5 h-5 animate-spin text-rose-600" />
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prev) => ({ ...prev, image: "" }));
                                setPhotoPreview(null);
                              }}
                              className="p-1 text-slate-400 hover:text-red-500 rounded-lg z-20 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="py-3 flex flex-col items-center justify-center gap-1.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-400 group-hover:text-rose-500 group-hover:scale-110 transition">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Choose or drag &amp; drop patient photo from device
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Uploads automatically to live cloud storage
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or Cloudinary URL"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setPhotoPreview(e.target.value);
                        }}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-rose-500 outline-none"
                      />
                      {formData.image && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          <div className="text-[11px] text-slate-600">
                            <p className="text-slate-900 font-bold">Image Preview</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[250px]">{formData.image}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Submit Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{editingPatient ? "Update Appeal" : "Publish Appeal"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

