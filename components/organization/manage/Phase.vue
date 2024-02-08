<template>
  <div>
      <div class="title">
        {{title1}}<br/>
        {{title2}}
      </div>

      <div v-if="searchActivated" class="mt-24 m-input-wrap">
          <div class="m-input-text type03">
              <SearchIcon v-if="search == ''" class="search-icon" />
              <input type="text" placeholder="이름 또는 번호 검색" :value="search" @input="emitChange">
          </div>
      </div>

  </div>
</template>

<script>
import SearchIcon from '@/components/organization/SearchIcon.vue'
export default {
  name: "ManagePhage",
  components: {
    SearchIcon
  },
  props: {
    title1: {
      type: String,
      default: () => {}
    },
    title2: {
      type: String,
      default: () => {}
    },
    searchActivated: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    emitChange(e) {
      this.search = e.target.value;
      this.$emit('change', e.target.value)
    }
  },
}
</script>

<style scoped>
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .m-input-text {
    position:relative;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    padding-top: 5px;
  }
  .m-input-text input::placeholder {
    color:#000;
    padding-left: 20px;
  }


</style>