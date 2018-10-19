<template>
  <section class="clearfix main">
    <div class="article">

      zzz

    </div>
  </section>
</template>

<script>
export default {
  scrollToTop: true,

  transition: 'fade'
}
</script>

<style lang="scss" scoped>
.article {
  color: $white;
  @include transform(translateX(200px));
}
</style>
