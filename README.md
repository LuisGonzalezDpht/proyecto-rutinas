# Proyecto Rutinas 💪

Una aplicación web moderna para gestionar y organizar rutinas de ejercicios de manera eficiente. Desarrollada con Vue 3, TypeScript y Vite, esta aplicación permite a los usuarios visualizar, seguir y gestionar sus rutinas de entrenamiento diarias.

## 🚀 Características

- **Gestión de Rutinas**: Visualiza rutinas de ejercicios organizadas por días de la semana
- **Interfaz Moderna**: Diseño responsivo con PrimeVue y TailwindCSS
- **Autenticación**: Sistema de login/logout con persistencia de estado
- **PWA Ready**: Configurada como Progressive Web App
- **TypeScript**: Tipado estático para mayor robustez del código
- **Gestión de Estado**: Pinia para manejo eficiente del estado global

## 🏗️ Arquitectura del Proyecto

### Estructura Principal
```
src/
├── components/          # Componentes reutilizables
│   ├── FooterComponent.vue
│   ├── HeaderComponent.vue
│   ├── LoginComponent.vue
│   ├── MarkLoaderComponent.vue
│   └── WorkoutsOfTheDayComponent.vue
├── views/              # Vistas principales
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── RoutineView.vue
│   └── CreateRoutineView.vue
├── stores/             # Gestión de estado con Pinia
│   ├── authStore.ts
│   └── workoutsStore.ts
├── assets/             # Recursos estáticos
│   ├── routines/       # Submódulo con datos de rutinas
│   ├── css/
│   └── svg/
├── composables/        # Funciones reutilizables
├── middleware/         # Middlewares de autenticación
└── shared/            # Tipos y constantes compartidas
```

### Tecnologías Utilizadas

- **Frontend**: Vue 3 (Composition API)
- **Tipado**: TypeScript
- **Build Tool**: Vite
- **UI Framework**: PrimeVue + TailwindCSS
- **Estado**: Pinia con persistencia
- **Router**: Vue Router 4
- **Markdown**: Marked para procesamiento de contenido
- **HTTP Client**: Axios

## 📦 Gestión de Submódulos Git

Este proyecto utiliza un submódulo Git para gestionar los datos de rutinas de manera independiente:

### Submódulo de Rutinas
- **Ubicación**: `src/assets/routines/`
- **Repositorio**: [rutinas](https://github.com/LuisGonzalezDpht/rutinas.git)
- **Propósito**: Contiene los datos de rutinas en formato Markdown y JSON

### Comandos de Submódulos

```bash
# Inicializar submódulos (primera vez)
npm run submodules:init

# Actualizar submódulos a la última versión
npm run submodules:update

# Ver estado de los submódulos
npm run submodules:status

# Limpiar submódulos
npm run submodules:clean

# Para Vercel (automático en deploy)
npm run install:vercel
```

### Scripts de Gestión
El proyecto incluye scripts automatizados en `bin/manage-submodules.sh` que facilitan:
- Inicialización automática de submódulos
- Actualización sincronizada
- Verificación de estado
- Limpieza de archivos temporales

## 🛠️ Configuración del Proyecto

### Requisitos
- Node.js >= 22.12.0
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd proyecto-rutinas

# Instalar dependencias
npm install

# Inicializar submódulos
npm run submodules:init
```

### Desarrollo

```bash
# Servidor de desarrollo con hot-reload
npm run dev
```

### Construcción

```bash
# Verificación de tipos y construcción para producción
npm run build
```

### Linting y Formato

```bash
# Ejecutar ESLint con corrección automática
npm run lint

# Formatear código con Prettier
npm run format
```

## 🔧 Configuración IDE Recomendada

- **Editor**: [VSCode](https://code.visualstudio.com/)
- **Extensiones**:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (deshabilitar Vetur)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 📱 PWA (Progressive Web App)

La aplicación está configurada como PWA con:
- Manifest web (`site.webmanifest`)
- Service Worker automático
- Iconos optimizados para diferentes dispositivos
- Modo standalone para instalación

## 🚀 Despliegue

El proyecto está configurado para despliegue automático en Vercel:
- Los submódulos se inicializan automáticamente durante el build
- Configuración optimizada en `vercel.json`
- Variables de entorno gestionadas a través de Vercel

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo `LICENSE`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

Para más información sobre la configuración de Vite, consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).
