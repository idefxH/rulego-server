<script setup>
import DefaultEndpointNode from '@src/pages/workflow/app-design/flow-node/components/default-endpoint-node.vue';

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
  <default-endpoint-node :properties="props.properties" :model="props.model">
  </default-endpoint-node>
</template>
