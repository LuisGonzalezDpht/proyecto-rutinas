<template>
  <main class="min-h-screen flex flex-col justify-between bg-neutral-300 dark:bg-neutral-950">
    <HeaderComponent />
    <div class="flex flex-col items-center justify-center flex-1">
      <slot />
    </div>
    <FooterComponent />
  </main>
</template>
