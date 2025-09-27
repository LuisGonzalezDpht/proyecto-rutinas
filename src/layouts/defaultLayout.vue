<template>
  <main class="min-h-screen flex flex-col justify-between">
    <HeaderComponent />
    <div class="flex flex-col items-center justify-center flex-1">
      <slot />
    </div>
    <FooterComponent />
  </main>
</template>
