<template>
  <Button
    :label="props.to ? undefined : props.label"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    :icon="props.icon"
    :severity="props.severity"
    :as-child="props.to !== null"
    v-slot="slotProps"
  >
    <RouterLink v-if="props.to" :to="props.to" :class="slotProps.class">
      <component v-if="props.iconComponent" :is="props.iconComponent" class="w-5" />
      <span :class="{ 'md:block hidden': props.iconComponent }">{{ props.label }}</span>
    </RouterLink>
    <template v-else>
      <component v-if="props.iconComponent" :is="props.iconComponent" class="w-5" />
      <span v-if="props.label" :class="{ 'md:block hidden': props.iconComponent }">{{ props.label }}</span>
    </template>
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
  iconComponent: {
    type: Object,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
