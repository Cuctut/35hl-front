<template>
  <a-card class="welcome-card">
    <div class="content">
      <h1>欢迎来到 35 High Math</h1>
      <p>在这里，变得更强。</p>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'WelcomeCard',
};
</script>

<style scoped>
.welcome-card {
  border-bottom: 1px solid #ccc;
}

.content {
  padding: 10px 50px;
  transition: .5s;
}


@media (max-height: 1000px) {
  .content {
    padding: 0 30px;
  }
  p {
    display: none;
  }
}

@media (min-height: 1001px) {
  .content {
    padding: 10px 50px;
  }
}
</style>