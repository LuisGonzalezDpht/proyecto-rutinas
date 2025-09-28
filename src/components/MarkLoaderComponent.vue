<template>
  <div class="w-full grid justify-center">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex items-center justify-center p-8">
      <span class="loader"></span>
      <span class="ml-3 text-gray-600">Cargando contenido...</span>
    </div>

    <!-- Estado de error -->
    <Message v-else-if="error" severity="error" icon="pi pi-exclamation-triangle" class="my-10">
      Error al cargar contenido
    </Message>

    <!-- Contenido markdown -->
    <div
      v-else
      class="select-text bg-neutral-100 lg:dark:bg-neutral-900 dark:bg-neutral-950 lg:p-10 p-5 lg:rounded-lg drop-shadow-2xl transition-all duration-200 ease-in-out"
      v-html="htmlContent"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useMarkdownLoader } from '../composables/useMarkdownLoader'

const props = defineProps({
  markdownPath: {
    type: String,
    required: true,
    description: 'Ruta relativa al archivo markdown, siempre carga en assets',
  },
})

const { htmlContent, isLoading, error, loadMarkdown } = useMarkdownLoader(props.markdownPath)

onMounted(async () => {
  await loadMarkdown()
})
</script>

<style scoped>
/* ==========================================================================
   Estilos para Etiquetas HTML usando CSS Normal con :deep() para v-html
   ========================================================================== */

/* Encabezados (h1-h6) */
:deep(h1) {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

:deep(h2) {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.25rem;
  line-height: 1.25;
}

:deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.375;
}

:deep(h4) {
  font-size: 1.25rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;
  line-height: 1.375;
}

:deep(h5) {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

:deep(h6) {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Párrafos y texto */
:deep(p) {
  font-size: 1rem;
  color: #374151;
  margin-bottom: 1rem;
  line-height: 1.625;
}

:deep(span) {
  color: #374151;
}

:deep(strong),
:deep(b) {
  font-weight: 600;
  color: #111827;
}

:deep(em),
:deep(i) {
  font-style: italic;
  color: #374151;
}

:deep(small) {
  font-size: 0.875rem;
  color: #4b5563;
}

/* Enlaces */
:deep(a) {
  color: #2563eb;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition:
    color 0.2s ease-in-out,
    text-decoration-thickness 0.2s ease-in-out;
  cursor: pointer;
}

:deep(a:hover) {
  color: #1d4ed8;
  text-decoration-thickness: 2px;
}

:deep(a:visited) {
  color: #7c3aed;
}

/* Listas */
:deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
}

:deep(ul li) {
  margin-bottom: 0.25rem;
}

:deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
  margin-bottom: 1rem;
}

:deep(ol li) {
  margin-bottom: 0.25rem;
}

:deep(li) {
  color: #374151;
  line-height: 1.625;
}

/* Listas anidadas */
:deep(ul ul),
:deep(ol ol),
:deep(ul ol),
:deep(ol ul) {
  margin-left: 1.5rem;
  margin-bottom: 0;
  margin-top: 0.25rem;
}

/* Elementos de código */
:deep(code) {
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family:
    ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  border: 1px solid #e5e7eb;
}

:deep(pre) {
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
}

:deep(pre code) {
  background-color: transparent;
  border: none;
  padding: 0;
  color: inherit;
}

/* Citas */
:deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin-bottom: 1rem;
  background-color: #eff6ff;
  color: #374151;
  font-style: italic;
}

/* Líneas horizontales */
:deep(hr) {
  border: none;
  border-top: 1px solid #d1d5db;
  margin: 2rem 0;
}

/* Tablas */
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #d4d4d8;
}

:deep(th) {
  background: #e5e5e5;
  color: #404040;
  font-weight: 600;
  padding: 1rem 1.25rem;
  text-align: left;
  border: none;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  position: relative;
  border-bottom: 1px solid #d4d4d8;
}

:deep(th:first-child) {
  border-top-left-radius: 12px;
}

:deep(th:last-child) {
  border-top-right-radius: 12px;
}

:deep(td) {
  padding: 1rem 1.25rem;
  border: none;
  border-bottom: 1px solid #d4d4d8;
  color: #525252;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: background-color 0.2s ease;
  background-color: #f5f5f5;
}

:deep(tr:hover td) {
  background-color: #d4d4d8;
}

:deep(tr:nth-child(even) td) {
  background-color: #e5e5e5;
}

:deep(tr:nth-child(even):hover td) {
  background-color: #d4d4d8;
}

:deep(tr:last-child td) {
  border-bottom: none;
}

:deep(tr:last-child td:first-child) {
  border-bottom-left-radius: 12px;
}

:deep(tr:last-child td:last-child) {
  border-bottom-right-radius: 12px;
}

/* Formularios básicos */
:deep(input[type='text']),
:deep(input[type='email']),
:deep(input[type='password']),
:deep(input[type='number']),
:deep(input[type='search']),
:deep(input[type='url']),
:deep(textarea),
:deep(select) {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #111827;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

:deep(input[type='text']:focus),
:deep(input[type='email']:focus),
:deep(input[type='password']:focus),
:deep(input[type='number']:focus),
:deep(input[type='search']:focus),
:deep(input[type='url']:focus),
:deep(textarea:focus),
:deep(select:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

:deep(label) {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

/* Botones básicos (solo si no hay framework de UI) */
:deep(button:not([class*='p-']):not([class*='btn'])) {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 500;
  border-radius: 0.375rem;
  border: none;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

:deep(button:not([class*='p-']):not([class*='btn']):hover) {
  background-color: #1d4ed8;
}

:deep(button:not([class*='p-']):not([class*='btn']):focus) {
  outline: none;
  box-shadow:
    0 0 0 2px rgba(59, 130, 246, 0.5),
    0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Imágenes responsivas */
:deep(img) {
  max-width: 100%;
  height: auto;
}

/* Elementos de detalle/resumen */
:deep(details) {
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

:deep(summary) {
  padding: 0.75rem;
  background-color: #f3f4f6;
  cursor: pointer;
  font-weight: 500;
  color: #111827;
  transition: background-color 0.2s ease-in-out;
}

:deep(summary:hover) {
  background-color: #e5e7eb;
}

:deep(details[open] summary) {
  border-bottom: 1px solid #d1d5db;
}

:deep(details > *:not(summary)) {
  padding: 0.75rem;
}

/* Elementos de marcado/resaltado */
:deep(mark) {
  background-color: #fef3c7;
  color: #111827;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
}

/* Elementos de teclado */
:deep(kbd) {
  background-color: #e5e7eb;
  color: #1f2937;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family:
    ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
  :deep(h1) {
    color: #ffffff;
  }

  :deep(h2) {
    color: #f3f4f6;
  }

  :deep(h3) {
    color: #f3f4f6;
  }

  :deep(h4) {
    color: #e5e7eb;
  }

  :deep(h5) {
    color: #e5e7eb;
  }

  :deep(h6) {
    color: #d1d5db;
  }

  :deep(p) {
    color: #d1d5db;
  }

  :deep(span) {
    color: #d1d5db;
  }

  :deep(strong),
  :deep(b) {
    color: #ffffff;
  }

  :deep(em),
  :deep(i) {
    color: #d1d5db;
  }

  :deep(small) {
    color: #9ca3af;
  }

  :deep(a) {
    color: #60a5fa;
  }

  :deep(a:hover) {
    color: #93c5fd;
  }

  :deep(a:visited) {
    color: #a78bfa;
  }

  :deep(li) {
    color: #d1d5db;
  }

  :deep(code) {
    background-color: #1f2937;
    color: #e5e7eb;
    border-color: #374151;
  }

  :deep(pre) {
    background-color: #1f2937;
    color: #e5e7eb;
    border-color: #374151;
  }

  :deep(blockquote) {
    border-left-color: #60a5fa;
    background-color: rgba(59, 130, 246, 0.1);
    color: #d1d5db;
  }

  :deep(hr) {
    border-top-color: #4b5563;
  }

  :deep(table) {
    background: #1f2937;
    border: 1px solid #374151;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }

  :deep(th) {
    background: #111827;
    color: #f9fafb;
    border-bottom: 1px solid #374151;
  }

  :deep(td) {
    border-bottom: 1px solid #374151;
    color: #d1d5db;
    background-color: #1f2937;
  }

  :deep(tr:hover td) {
    background-color: #374151;
  }

  :deep(tr:nth-child(even) td) {
    background-color: #111827;
  }

  :deep(tr:nth-child(even):hover td) {
    background-color: #374151;
  }

  :deep(input[type='text']),
  :deep(input[type='email']),
  :deep(input[type='password']),
  :deep(input[type='number']),
  :deep(input[type='search']),
  :deep(input[type='url']),
  :deep(textarea),
  :deep(select) {
    border-color: #4b5563;
    background-color: #1f2937;
    color: #ffffff;
  }

  :deep(label) {
    color: #d1d5db;
  }

  :deep(details) {
    border-color: #4b5563;
  }

  :deep(summary) {
    background-color: #1f2937;
    color: #ffffff;
  }

  :deep(summary:hover) {
    background-color: #374151;
  }

  :deep(details[open] summary) {
    border-bottom-color: #4b5563;
  }

  :deep(mark) {
    background-color: #92400e;
    color: #ffffff;
  }

  :deep(kbd) {
    background-color: #374151;
    color: #e5e7eb;
    border-color: #4b5563;
  }
}
</style>
