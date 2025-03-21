<template>
  <a-layout-footer >
    <a-card class="footer">
      <div class="content">
        <p>
          <strong>My Awesome Project</strong> by <a href="https://github.com/yourusername">Cuctut</a>.
        </p>
        <p>
          &copy; 2025 All rights reserved.
        </p>
      </div>
    </a-card>
  </a-layout-footer>
</template>

<script>
export default {
  name: 'GFooter'
}
</script>

<style scoped>
.footer {
  display: flex;
  border-top: 2px solid #e7e7e7;
  justify-content: center;
  align-items: center;
}

.footer .content {
  text-align: center;
}

.footer a {
  color: #3273dc;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>