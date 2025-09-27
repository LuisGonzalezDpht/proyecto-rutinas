#!/usr/bin/env bash
set -euo pipefail

# Move to the repo root
cd "$(git rev-parse --show-toplevel)"

# Ensure we’re not in a detached HEAD or bare repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a valid Git working tree."
  exit 1
fi

# Define submodule variables
SUBMODULE_PATH="src/assets/routines"
SUBMODULE_NAME="src/assets/routines"
SUBMODULE_URL="https://github.com/LuisGonzalezDpht/rutinas.git"

# Remove existing submodule entry (if any)
if git config --file .gitmodules --get-regexp "^submodule\.${SUBMODULE_NAME//\//.}\." > /dev/null 2>&1; then
  echo "Removing existing submodule config for ${SUBMODULE_PATH}..."
  git submodule deinit -f "${SUBMODULE_PATH}" || true
  git rm -f "${SUBMODULE_PATH}" || true
  rm -rf ".git/modules/${SUBMODULE_PATH}"
fi
 
# Clean local submodule dir if needed
echo "Cleaning local directory ${SUBMODULE_PATH}..."
rm -rf "${SUBMODULE_PATH}"

# Create parent directory if it doesn't exist
mkdir -p "$(dirname "${SUBMODULE_PATH}")"
 
# Add the submodule
echo "Adding submodule ${SUBMODULE_URL} to ${SUBMODULE_PATH}..."
git submodule add -f "${SUBMODULE_URL}" "${SUBMODULE_PATH}"
 
# Sync & init
echo "Syncing and initializing submodule..."
git submodule sync
git submodule update --init --recursive

echo "Submodule ${SUBMODULE_PATH} successfully initialized!"
echo "Content available at: ${SUBMODULE_PATH}"