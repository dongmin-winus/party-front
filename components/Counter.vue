<template>
  <div class="counter-container">
    <div class="solid-btn" :style="`width:${width}; height:${height}`">
      <div class="value-container" style="padding-bottom:5px" @click="decrement">
        <button class="value" :class="computedNoSubtract">–</button>
      </div>
      <b style="font-size:x-large">{{ count }}</b>
      <div class="value-container" @click="increment">
        <button class="value" :class="computedNoAdd">+</button>
      </div>
    </div>

   
    
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    propStock: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    computedNoSubtract() {
      return  this.count == 0 ? 'unreachable' : '';
       
    },
    computedNoAdd() {
      return this.count == this.propStock ? 'unreachable' : '';
    },
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</script>

<style scoped>
  .counter-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .solid-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #777;
    border-radius: 5px;
    /* width: 70%;
    height: 40px; */
    padding-bottom: 5px;
  }

  .solid-btn .value-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
  }
  .solid-btn .value-container .value {
    font-size: x-large;
  }

  .unreachable {
    color: #d8d8d8;
  }


</style>
