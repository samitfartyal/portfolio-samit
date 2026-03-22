import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'

const ProjectsContext = createContext(null)

const COLLECTION_NAME = 'projects'

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const fetched = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProjects(fetched)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const addProject = async (projectData) => {
    try {
      setError(null)
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        title: projectData.title,
        description: projectData.description,
        fullDescription: projectData.fullDescription || '',
        tech: projectData.tech || [],
        image: projectData.image || '',
        github: projectData.github || '',
        live: projectData.live || '',
        createdAt: serverTimestamp()
      })
      const newProject = {
        id: docRef.id,
        title: projectData.title,
        description: projectData.description,
        fullDescription: projectData.fullDescription || '',
        tech: projectData.tech || [],
        image: projectData.image || '',
        github: projectData.github || '',
        live: projectData.live || '',
        createdAt: new Date()
      }
      setProjects(prev => [newProject, ...prev])
      return newProject
    } catch (err) {
      console.error('Error adding project:', err)
      setError('Failed to add project')
      throw err
    }
  }

  const deleteProject = async (id) => {
    try {
      setError(null)
      await deleteDoc(doc(db, COLLECTION_NAME, id))
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
      setError('Failed to delete project')
      throw err
    }
  }

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, addProject, deleteProject, fetchProjects }}>
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
