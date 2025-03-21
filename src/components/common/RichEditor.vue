<template>
  <div class="rich-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 550px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
      :mode="mode"
    />
    <!-- <a-button @click="getToolbarKeys">getToolbarKeys</a-button> -->
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { DomEditor } from '@wangeditor/editor';

export default {
  components: { Editor, Toolbar },
  setup(props, { emit }) {
    const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
    const valueHtml = ref(''); // 内容 HTML
    const toolbarConfig = {
      toolbarKeys: [
        "headerSelect", 
        "|", "bold", "italic", "underline", 
        "color", "bgColor", "clearStyle",
        {
            "key": "group-more-style",
            "title": "更多",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
            "menuKeys": [
                "through",
                "code",
                "sup",
                "sub"
            ]
        },
        "|", "bulletedList", "numberedList",
        {
            "key": "group-justify",
            "title": "对齐",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
            "menuKeys": [
                "justifyLeft",
                "justifyRight",
                "justifyCenter",
                "justifyJustify"
            ]
        },
        {
            "key": "group-indent",
            "title": "缩进",
            "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
            "menuKeys": [
                "indent",
                "delIndent"
            ]
        },
        "|", "emotion", 'insertFormula', "insertTable", "divider",
        "|", "undo", "redo",
        "|","fullScreen"
      ],
    }
    const editorConfig = { 
      placeholder: "请输入内容...",
      hoverbarKeys: {
        formula: {
          menuKeys: ['editFormula'], // “编辑公式”菜单
        },
      },
    };

    onMounted(() => {
      
    });
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      let htmlContent = editor.getHtml();
      // 判断如果内容是空的占位符（如 <p><br></p>），则视为空字符串
      if (htmlContent === '<p><br></p>') htmlContent = ''; // 设置为空字符串
      emit('update:modelValue', htmlContent); // 触发父组件更新 // 触发父组件更新
    };

    const getToolbarKeys = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      const toolbar = DomEditor.getToolbar(editor)
      const curToolbarConfig = toolbar.getConfig()
      console.log("toolbarKeys", curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
    };

    return {
      editorRef,
      valueHtml,
      // mode: "simple",
      mode: "default",
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      getToolbarKeys,
    };
  },
};
</script>

<style scoped>
.rich-editor {
  width: 100%;
  border: 1px solid #ccc;
}
:deep(.w-e-scroll) {
  height: 550px;
}
</style>