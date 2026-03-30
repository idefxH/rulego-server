<script setup>
import DefaultNode from '@src/pages/workflow/app-design/flow-node/components/default-node.vue';

const props = defineProps({
  /**
   * Node properties (properties every node must have)
   * @type {Object}
   * @property {Object} formData Form
   * @property {string} formData.description Description
   * @property {string} formData.title Title
   * @property {Object} status Status
   * @property {boolean} status.isSelected YesWhether selected
   */
  properties: Object,
  model: Object,
});
</script>

<template>
  <default-node :properties="props.properties" :model="props.model">
  </default-node>
</template>
