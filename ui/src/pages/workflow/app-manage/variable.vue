<script lang="js" setup>
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['save']);

const formRef = ref();
const dialogVisible = ref(false);
const dialogTitle = ref('Add Variable');
const formState = ref({
  key: '',
  value: '',
});
const rules = ref({
  key: [
    {
      required: true,
      message: 'Variable Name is required',
      trigger: ['blur', 'change'],
    },
    // Cannot start with a number
    {
      pattern: /^[^\d].*$/,
      message: 'Variable name cannot start with a number',
      trigger: ['blur', 'change'],
    },
    // Only letters, numbers, and underscores allowed
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Variable name can only contain letters, numbers, underscore',
      trigger: ['blur', 'change'],
    },
    // Cannot be duplicated
    {
      validator: (_, value, callback) => {
        if (isEdit()) {
          callback();
        } else if (props.data.some((item) => item.key === value)) {
          callback(new Error('Variable Name duplicated'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
});

function isEdit() {
  return dialogTitle.value === 'Edit Variable';
}

function setDialogTitle(title) {
  dialogTitle.value = title;
}

function addHandler() {
  setDialogTitle('Add Variable');
  open();
}

function editHandler(key, value) {
  setDialogTitle('Edit Variable');
  formState.value.key = key;
  formState.value.value = value;
  open();
}

function deleteHandler(key) {
  const index = props.data.findIndex((item) => item.key === key);
  props.data.splice(index, 1);
  emit('save');
}

function close() {
  formRef.value.resetFields();
  dialogVisible.value = false;
}

function open() {
  dialogVisible.value = true;
}

async function submitHandler() {
  try {
    await formRef.value.validate();
    if (isEdit() === false) {
      props.data.push({
        key: formState.value.key,
        value: formState.value.value,
      });
    }
    if (isEdit()) {
      const item = props.data.find((item) => item.key === formState.value.key);
      item.value = formState.value.value;
    }
    emit('save');
    close();
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="px-4">
    <div class="flex justify-end pb-2">
      <el-button type="primary" @click="addHandler">Add Variable</el-button>
    </div>
    <el-table size="small" :data="props.data" :border="true">
      <el-table-column prop="key" label="Name" width="180" />
      <el-table-column prop="value" label="Value" />
      <el-table-column prop="action" label="Operation" width="90" align="center">
        <template #default="scope">
          <el-space>
            <el-button
              :link="true"
              type="primary"
              size="small"
              @click.prevent="editHandler(scope.row.key, scope.row.value)"
            >
              Edit
            </el-button>
            <el-button
              :link="true"
              type="primary"
              size="small"
              @click.prevent="deleteHandler(scope.row.key)"
            >
              Delete
            </el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <!-- Modal form -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="300px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Variable Name" prop="key">
          <el-input
            v-model="formState.key"
            :disabled="isEdit()"
            placeholder="Variable Name"
          />
        </el-form-item>
        <el-form-item label="Variable Value" prop="value">
          <el-input v-model="formState.value" placeholder="Variable Value"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">Close</el-button>
          <el-button type="primary" @click="submitHandler">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
