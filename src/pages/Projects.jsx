import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useProjects } from '../context/ProjectsContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

function ProjectCard({ project, onClick }) {
  const hasImage = project.image && project.image.startsWith("data:")

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
    >
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {hasImage ? (
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-xs font-medium text-white border border-white/10">
            View Details →
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="tag text-[10px]">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/15">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Projects() {
  const navigate = useNavigate()
  const { projects, loading, error } = useProjects()

  return (
    <PageTransition>
      <section className="relative min-h-screen py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-blue-400 text-sm font-medium mb-2 tracking-wider uppercase">Portfolio</p>
            <h1 className="section-heading mb-3">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-gray-400 text-base max-w-xl">
              A collection of projects that showcase my skills and passion for building great software.
            </p>
          </motion.div>

          {loading ? (
            <motion.div variants={itemVariants} className="flex items-center justify-center py-24">
              <div className="glass-card inline-flex rounded-2xl p-10 items-center gap-4">
                <svg className="w-8 h-8 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-gray-400">Loading projects...</span>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div variants={itemVariants} className="text-center py-24">
              <div className="glass-card inline-flex rounded-2xl p-10">
                <div>
                  <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Error Loading Projects</h3>
                  <p className="text-gray-400 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-24">
              <div className="glass-card inline-flex rounded-2xl p-10">
                <div>
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
                  <p className="text-gray-400 text-sm">Projects added from the admin panel will appear here.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </PageTransition>
  )
}

export default Projects
