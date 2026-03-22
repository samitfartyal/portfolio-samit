import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useProjects } from "../context/ProjectsContext";

export default function Dashboard() {
  const { projects, loading, error, addProject, deleteProject } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fullDescription: "",
    tech: "",
    image: "",
    github: "",
    live: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/admin");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addProject({
        title: form.title,
        description: form.description,
        fullDescription: form.fullDescription,
        tech: form.tech.split(",").map(t => t.trim()).filter(t => t),
        image: imagePreview || "",
        github: form.github || "",
        live: form.live || "",
      });
      setSuccess(true);
      setForm({ title: "", description: "", fullDescription: "", tech: "", image: "", github: "", live: "" });
      setImagePreview(null);
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 1500);
    } catch (err) {
      alert("Failed to add project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      await deleteProject(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (err) {
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageTransition>
      <section className="relative min-h-screen py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
            <div>
              <p className="text-blue-400 text-sm font-medium mb-1 tracking-wider uppercase">Dashboard</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Manage <span className="gradient-text">Projects</span>
              </h1>
            </div>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-red-400 glass-card rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => { setShowForm(!showForm); setShowList(false); }}
              className={`glass-card rounded-2xl p-5 text-left ${showForm ? 'border-blue-500/30 bg-blue-500/5' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Add New Project</h3>
              <p className="text-xs text-gray-400">Create a project with images and details</p>
            </button>

            <button 
              onClick={() => { setShowList(!showList); setShowForm(false); }}
              className={`glass-card rounded-2xl p-5 text-left ${showList ? 'border-purple-500/30 bg-purple-500/5' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Manage Projects</h3>
              <p className="text-xs text-gray-400">View and delete projects ({loading ? '...' : projects.length})</p>
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-6 lg:p-8 mb-8"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Add New Project</h2>
                
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-400">Project Added!</h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          className="input-field text-sm"
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Short Description *</label>
                        <input
                          type="text"
                          required
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          className="input-field text-sm"
                          placeholder="A brief description"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Description</label>
                      <textarea
                        value={form.fullDescription}
                        onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                        rows={4}
                        className="input-field text-sm resize-none"
                        placeholder="Detailed description of your project..."
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Tech Stack</label>
                        <input
                          type="text"
                          value={form.tech}
                          onChange={(e) => setForm({ ...form, tech: e.target.value })}
                          className="input-field text-sm"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Project Image</label>
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="input-field cursor-pointer text-center py-4 hover:border-blue-500/50 transition-colors"
                        >
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-20 object-cover rounded-lg" />
                          ) : (
                            <div className="text-gray-500">
                              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs">Click to upload</span>
                            </div>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub URL</label>
                        <input
                          type="url"
                          value={form.github}
                          onChange={(e) => setForm({ ...form, github: e.target.value })}
                          className="input-field text-sm"
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Live Demo URL</label>
                        <input
                          type="url"
                          value={form.live}
                          onChange={(e) => setForm({ ...form, live: e.target.value })}
                          className="input-field text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="btn-primary w-full justify-center disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Adding...
                        </span>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Project
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showList && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-6 lg:p-8"
              >
                <h2 className="text-lg font-semibold text-white mb-6">All Projects ({loading ? '...' : projects.length})</h2>
                
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <svg className="w-8 h-8 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-16">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-500 text-sm">No projects yet. Add one above!</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p) => (
                      <div key={p.id} className="glass-card rounded-xl overflow-hidden group">
                        <div className="relative h-32 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                          {p.image && p.image.startsWith("data:") ? (
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-sm text-white truncate">{p.title}</h4>
                          <p className="text-gray-400 text-xs line-clamp-2 mt-1">{p.description}</p>
                          <button 
                            onClick={() => setDeleteConfirm(p)}
                            className="mt-3 w-full py-2 text-xs text-red-400 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => !deleting && setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass-card rounded-2xl p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Delete Project?</h3>
                  <p className="text-sm text-gray-400">
                    This will permanently delete <span className="text-white font-medium">{deleteConfirm.title}</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setDeleteConfirm(null)} 
                    disabled={deleting}
                    className="flex-1 py-2.5 text-sm text-gray-300 glass-card rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete} 
                    disabled={deleting}
                    className="flex-1 py-2.5 text-sm bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors font-medium disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
