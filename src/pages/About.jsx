import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

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

const skillCategories = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'MongoDB', level: 75 },
    ]
  },
  {
    category: 'Tools',
    icon: '🔧',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 65 },
      { name: 'Figma', level: 70 },
    ]
  },
]

const education = {
  institution: 'Sir Chotu Ram Institute of Engineering and Technology',
  shortName: 'SCRIET',
  degree: 'B.Tech in Computer Science',
  period: '2022 - 2026',
  highlights: ['Full Stack Development', 'AI/ML', 'Problem Solving'],
}

function About() {
  return (
    <PageTransition>
      <section className="relative min-h-screen py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f1729] to-[#0a0a0f]" />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-blue-400 text-sm font-medium mb-2 tracking-wider uppercase">About Me</p>
            <h1 className="section-heading mb-3">
              Get to <span className="gradient-text">Know Me</span>
            </h1>
            <p className="text-gray-400 text-base max-w-xl">
              A passionate developer building digital experiences that make a difference.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">Who I Am</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I'm Samit Fartyal, a Full Stack Developer with a strong interest in AI and problem-solving. 
                  I love building clean, efficient applications that solve real-world problems.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">Education</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-medium text-sm">{education.shortName}</h3>
                    <p className="text-gray-400 text-xs">{education.institution}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {education.degree}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {education.period}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {education.highlights.map((h) => (
                      <span key={h} className="tag">{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">Interests</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Web Development', 'AI/ML', 'Open Source', 'Cloud Computing', 'UI/UX Design'].map((interest) => (
                    <span key={interest} className="tag">{interest}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">Technical Skills</h2>
                </div>

                <div className="space-y-8">
                  {skillCategories.map((category, ci) => (
                    <div key={ci}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">{category.icon}</span>
                        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">{category.category}</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {category.items.map((skill, si) => (
                          <div key={si} className="group">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-sm text-gray-300">{skill.name}</span>
                              <span className="text-xs text-gray-500">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.3 + ci * 0.1 + si * 0.05, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}

export default About
