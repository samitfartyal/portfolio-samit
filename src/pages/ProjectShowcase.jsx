import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
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

function ProjectShowcase() {
  const { id } = useParams()
  const { projects, loading, error } = useProjects()
  const project = projects.find(p => p.id === id)
  const hasImage = project?.image?.startsWith("data:")

  if (loading) {
    return (
      <PageTransition>
        <section className="relative min-h-screen flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />
          <div className="relative glass-card inline-flex rounded-2xl p-10 items-center gap-4">
            <svg className="w-8 h-8 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-gray-400">Loading project...</span>
          </div>
        </section>
      </PageTransition>
    )
  }

  if (error || !project) {
    return (
      <PageTransition>
        <section className="relative min-h-screen flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />
          <div className="relative text-center">
            <div className="glass-card inline-flex rounded-2xl p-10">
              <div>
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h1 className="text-2xl font-bold text-white mb-3">Project Not Found</h1>
                <Link to="/projects" className="btn-primary inline-flex text-sm">
                  ← Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
            {hasImage ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-5xl mx-auto">
              <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl">{project.description}</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto px-6 py-10 sm:py-14"
          >
            {project.tech && project.tech.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tag">
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">About the Project</h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {project.fullDescription || project.description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              {project.live && project.live !== '' && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Demo
                </a>
              )}
              {project.github && project.github !== '' && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Source Code
                </a>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/5">
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                View All Projects
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  )
}

export default ProjectShowcase
