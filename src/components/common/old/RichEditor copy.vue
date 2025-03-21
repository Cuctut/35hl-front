<template>
  <div class="rich-editor">
    <!-- <QuillEditor
      ref="editorRef"
      v-model:content="content"
      contentType="html"
      :options="options"
      @update:content="handleContentChange"
    /> -->
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'katex/dist/katex.min.css'

export default {
  components: { QuillEditor },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const content = ref(props.modelValue)
    const options = {
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
          [{ 'color': [] }, { 'background': [] }], // 字体颜色、背景颜色
          ['bold', 'italic', 'underline', { header: 1 }, { header: 2 }], // 加粗、斜体、下划线、标题
          ['formula', { script: 'sub' }, { script: 'super' }], // 公式、上标、下标
          [{ align: [] }, { 'indent': '-1'}, { 'indent': '+1' }], // 对齐方式、缩进
          [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表、无序列表
          ['link', 'image'], // 链接、图片
          ['clean'], // 清除格式
        ]
      },
      placeholder: '请输入内容...',
      theme: 'snow'
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== content.value) {
          content.value = newValue
        }
      }
    )

    const handleContentChange = (newContent) => {
      emit('update:modelValue', newContent)
    }

    return {
      content,
      options,
      handleContentChange,
    }
  },
}
</script>

<style scoped>
.rich-editor {
  width: 100%;
  height: 550px;
}
</style>