<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <PageTools :show-before="true">
      <span slot="before">前面</span>
      <el-button slot="after" type="primary">导入excel</el-button>
    </PageTools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTools from '@/components/PageTools'

export default {
  name: 'Dashboard',
  components: {
    PageTools
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
