<template>
  <Button
    :label="props.label"
    :variant="props.variant"
    :size="props.size"
    :icon="props.icon"
    :severity="props.severity"
    :as-child="props.to !== null"
    v-slot="slotProps"
  >
    <RouterLink :to="props.to" :class="slotProps.class">{{ props.label }}</RouterLink>
  </Button>
</template>

<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  severity: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'medium',
  },
  icon: {
    type: String,
    default: undefined,
  },
})
</script>
