import { motion } from 'framer-motion'

function ProjectCard({ title, description, tags, color }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden h-full group cursor-pointer"
    >
      <div className={`h-48 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-100 transition-opacity`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">🚀</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 rounded-xl glass text-sm font-medium hover:bg-white/10 transition-colors"
        >
          View Project →
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProjectCard
