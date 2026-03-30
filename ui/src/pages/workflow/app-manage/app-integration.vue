<script lang="js" setup>
import { ElMessage } from 'element-plus';

const props = defineProps({
  formState: {
    type: Object,
    default: () => ({
      id: '',
      name: '',
      description: '',
      root: false,
      debugMode: true,
    }),
  },
});

const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text); // Copy text to clipboard
      ElMessage({
        showClose: true,
        message: 'Copy Successful',
        type: 'success',
      });
    } else {
      // If not a secure context, use the old execCommand method
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      ElMessage({
        showClose: true,
        message: successful ? 'Copy Successful' : 'Copy Failed',
        type: successful ? 'success' : 'error',
      });
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
</script>

<template>
  <el-descriptions column="1" border title="Call the following HTTP endpoint to execute current rule chain">
    <el-descriptions-item label="Sync Call Interface"
      ><span
        @click="
          copyToClipboard(
            '/api/v1/rules/' + props.formState.id + '/execute/{msgType}',
          )
        "
        >POST /api/v1/rules/{{ props.formState.id }}/execute/{msgType}</span
      >
      <el-tag size="small" type="info"
        >Care about processing result</el-tag
      ></el-descriptions-item
    >
    <el-descriptions-item label="Async Call Interface"
      ><span
        @click="
          copyToClipboard(
            '/api/v1/rules/' + props.formState.id + '/notify/{msgType}',
          )
        "
        >POST /api/v1/rules/{{ props.formState.id }}/notify/{msgType}</span
      >
      <el-tag size="small" type="info"
        >Ignore processing result</el-tag
      ></el-descriptions-item
    >
  </el-descriptions>
</template>
