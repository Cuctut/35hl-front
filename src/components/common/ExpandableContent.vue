<template>
  <div class="expandable-content-wrapper">
    <!-- 容器添加 .expanded 控制展开状态 -->
    <div
      class="expandable-content"
      :class="{ expanded: expanded }"
      ref="content"
      v-html="contentHtml"
    ></div>
    <!-- 只有当内容超出折叠高度时才显示切换按钮 -->
    <div v-if="isOverflow" class="toggle-container">
      <button @click="toggle" class="toggle-button">
        {{ expanded ? '收起' : '展开' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from "vue";

export default {
  name: "ExpandableContent",
  props: {
    contentHtml: {
      type: String,
      required: true,
    },
    // 可通过 props 自定义折叠高度，默认150px
    collapsedHeight: {
      type: Number,
      default: 150,
    },
    // 展开状态下的高度，我们这里设置个较大的值模拟 auto
    expandedMaxHeight: {
      type: Number,
      default: 1000,
    },
  },
  setup(props) {
    const expanded = ref(false);
    const isOverflow = ref(false);
    const content = ref(null);

    const checkOverflow = () => {
      if (content.value) {
        // 如果内容的实际高度超过折叠高度，则标记为超出
        isOverflow.value = content.value.scrollHeight > props.collapsedHeight;
      }
    };

    const toggle = () => {
      expanded.value = !expanded.value;
    };

    // 内容渲染后检测高度
    onMounted(() => {
      // 使用 nextTick 确保 DOM 完全更新
      nextTick(() => {
        checkOverflow();
      });
    });
    watch(() => props.contentHtml, checkOverflow);

    return {
      expanded,
      isOverflow,
      content,
      toggle,
    };
  },
};
</script>

<style scoped>
.expandable-content-wrapper {
  position: relative;
  overflow: hidden;
}

/* 默认折叠状态 */
.expandable-content {
  max-height: 150px; /* 默认折叠高度 */
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* 展开时设置一个较大的 max-height */
.expandable-content.expanded {
  max-height: 1000px;
}

/* 切换按钮样式 */
.toggle-container {
  text-align: center;
  margin-top: 8px;
}

.toggle-button {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-weight: bold;
}
</style>
