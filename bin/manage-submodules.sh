#!/usr/bin/env bash
set -euo pipefail

# Script para gestionar submódulos del proyecto Rutinas
# Uso: ./bin/manage-submodules.sh [init|update|clean|status]

# Configuración de submódulos
declare -A SUBMODULES=(
  ["src/assets/routines"]="https://github.com/LuisGonzalezDpht/rutinas.git"
)

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de utilidad
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en un repositorio Git
check_git_repo() {
  if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    log_error "No estás dentro de un repositorio Git válido."
    exit 1
  fi
  
  # Moverse al root del repositorio
  cd "$(git rev-parse --show-toplevel)"
}

# Inicializar submódulos
init_submodules() {
  log_info "Inicializando submódulos..."
  
  for path in "${!SUBMODULES[@]}"; do
    local url="${SUBMODULES[$path]}"
    log_info "Procesando submódulo: $path"
    
    # Verificar si el submódulo ya existe
    if git config --file .gitmodules --get-regexp "^submodule\.${path//\//.}\." > /dev/null 2>&1; then
      log_warning "El submódulo $path ya existe. Actualizando..."
      git submodule update --init --recursive "$path"
    else
      # Crear directorio padre si no existe
      mkdir -p "$(dirname "$path")"
      
      # Agregar submódulo
      log_info "Agregando submódulo $url en $path"
      git submodule add "$url" "$path"
    fi
  done
  
  # Sincronizar e inicializar todos los submódulos
  git submodule sync
  git submodule update --init --recursive
  
  log_success "Submódulos inicializados correctamente!"
}

# Actualizar submódulos
update_submodules() {
  log_info "Actualizando submódulos..."
  
  git submodule update --remote --recursive
  
  log_success "Submódulos actualizados!"
}

# Limpiar submódulos
clean_submodules() {
  log_warning "¿Estás seguro de que quieres limpiar todos los submódulos? (y/N)"
  read -r response
  
  if [[ "$response" =~ ^[Yy]$ ]]; then
    for path in "${!SUBMODULES[@]}"; do
      log_info "Limpiando submódulo: $path"
      
      if [ -d "$path" ]; then
        git submodule deinit -f "$path" || true
        git rm -f "$path" || true
        rm -rf ".git/modules/$path" || true
        rm -rf "$path" || true
      fi
    done
    
    log_success "Submódulos limpiados!"
  else
    log_info "Operación cancelada."
  fi
}

# Mostrar estado de submódulos
status_submodules() {
  log_info "Estado de submódulos:"
  
  if [ -f .gitmodules ]; then
    git submodule status
    echo
    log_info "Configuración en .gitmodules:"
    cat .gitmodules
  else
    log_warning "No se encontró archivo .gitmodules"
  fi
}

# Mostrar ayuda
show_help() {
  echo "Gestión de Submódulos - Proyecto Rutinas"
  echo
  echo "Uso: $0 [comando]"
  echo
  echo "Comandos disponibles:"
  echo "  init     - Inicializar todos los submódulos"
  echo "  update   - Actualizar submódulos existentes"
  echo "  clean    - Limpiar todos los submódulos"
  echo "  status   - Mostrar estado de submódulos"
  echo "  help     - Mostrar esta ayuda"
  echo
  echo "Submódulos configurados:"
  for path in "${!SUBMODULES[@]}"; do
    echo "  - $path -> ${SUBMODULES[$path]}"
  done
}

# Función principal
main() {
  check_git_repo
  
  case "${1:-help}" in
    "init")
      init_submodules
      ;;
    "update")
      update_submodules
      ;;
    "clean")
      clean_submodules
      ;;
    "status")
      status_submodules
      ;;
    "help"|"-h"|"--help")
      show_help
      ;;
    *)
      log_error "Comando desconocido: $1"
      echo
      show_help
      exit 1
      ;;
  esac
}

# Ejecutar función principal con todos los argumentos
main "$@"