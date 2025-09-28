<template>
  <div class="w-full flex flex-col flex-1 justify-start items-center">
    <div
      class="max-w-3xl w-full flex flex-col justify-start items-center gap-y-4 bg-neutral-100 md:dark:bg-neutral-900 dark:bg-neutral-950 md:px-5 md:py-3 p-5 md:rounded-lg drop-shadow-2xl transition-all duration-200 ease-in-out"
    >
      <HomeActionsComponent />
      <hr class="w-full border-t border-gray-600" />
      <WorkoutsOfTheDayComponent />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
