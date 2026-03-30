<script setup>
import DefaultNode from '@src/pages/workflow/app-design/flow-node/components/default-node.vue';
import { computed } from 'vue';

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

const anchors = computed(() => props.properties.anchors || []);
</script>

<template>
  <default-node :properties="props.properties" :model="props.model">
    <div class="relative pb-2" v-if="anchors.length">
      <div
        class="anchor-item"
        v-for="anchor in anchors"
        :key="anchor.id"
        :data-id="anchor.id"
      >
        <div
          class="flex h-[20px] items-center justify-end px-2 text-[12px] font-semibold"
        >
          <div class="truncate text-gray-400" :title="anchor.name">
            {{ anchor.name }}
          </div>
        </div>
      </div>
    </div>
  </default-node>
</template>
