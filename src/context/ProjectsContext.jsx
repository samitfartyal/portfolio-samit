import { createContext, useContext, useState, useEffect } from 'react'

const ProjectsContext = createContext(null)

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('projects')) || []
      setProjects(saved)
    } catch (err) {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [])

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      title: projectData.title,
      description: projectData.description,
      fullDescription: projectData.fullDescription || '',
      tech: projectData.tech || [],
      image: projectData.image || '',
      github: projectData.github || '',
      live: projectData.live || '',
    }
    const updated = [newProject, ...projects]
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
    return newProject
  }

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    localStorage.setItem('projects', JSON.stringify(updated))
  }

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, addProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider')
  }
  return context
}
