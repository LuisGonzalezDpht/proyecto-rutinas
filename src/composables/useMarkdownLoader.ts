import { ref, computed } from 'vue'
import { marked } from 'marked'

// Importaciones estáticas de archivos markdown
// Esto permite que Vite los incluya correctamente en el bundle de producción
import routinesMarkdown from '../assets/routines/routines.md?raw'

// Mapa de archivos markdown disponibles
const markdownFiles: Record<string, string> = {
  '/routines/routines.md': routinesMarkdown,
  'routines.md': routinesMarkdown,
  '/routines.md': routinesMarkdown,
}

/**
 * Composable para cargar y procesar archivos markdown
 * @param markdownPath - Ruta del archivo markdown a cargar
 */
export function useMarkdownLoader(markdownPath: string) {
  const markdownContent = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Normaliza la ruta del archivo markdown
   */
  const normalizeMarkdownPath = (path: string): string => {
    // Remover barras iniciales y finales
    const cleanPath = path.replace(/^\/+|\/+$/g, '')
    
    // Intentar diferentes variaciones de la ruta
    const variations = [
      path,
      `/${cleanPath}`,
      cleanPath,
      `/${cleanPath.replace(/^routines\//, '')}`,
      cleanPath.replace(/^routines\//, ''),
    ]

    // Buscar la primera variación que exista en nuestro mapa
    for (const variation of variations) {
      if (markdownFiles[variation]) {
        return variation
      }
    }

    return path
  }

  /**
   * Carga el contenido markdown
   */
  const loadMarkdown = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const normalizedPath = normalizeMarkdownPath(markdownPath)
      const content = markdownFiles[normalizedPath]

      if (content) {
        markdownContent.value = content
      } else {
        console.warn(`No se pudo cargar el archivo markdown: ${markdownPath}`)
        console.warn('Archivos disponibles:', Object.keys(markdownFiles))
        
        error.value = `Archivo markdown no encontrado: ${markdownPath}`
        markdownContent.value = `# Error de carga\n\nNo se pudo cargar el archivo: \`${markdownPath}\`\n\nArchivos disponibles:\n${Object.keys(markdownFiles).map(key => `- ${key}`).join('\n')}`
      }
    } catch (err) {
      console.error('Error cargando markdown:', err)
      error.value = 'Error al cargar el archivo markdown'
      markdownContent.value = '# Error de carga\n\nOcurrió un error al cargar el contenido markdown.'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Contenido HTML procesado desde markdown
   */
  const htmlContent = computed(() => {
    if (!markdownContent.value) return ''
    
    try {
      return marked(markdownContent.value)
    } catch (err) {
      console.error('Error procesando markdown:', err)
      return '<p>Error procesando el contenido markdown</p>'
    }
  })

  /**
   * Información sobre archivos disponibles
   */
  const availableFiles = computed(() => Object.keys(markdownFiles))

  return {
    markdownContent: readonly(markdownContent),
    htmlContent,
    isLoading: readonly(isLoading),
    error: readonly(error),
    availableFiles,
    loadMarkdown,
  }
}

/**
 * Función utilitaria para agregar nuevos archivos markdown al mapa
 * Útil para expandir la funcionalidad en el futuro
 */
export function registerMarkdownFile(path: string, content: string): void {
  markdownFiles[path] = content
}