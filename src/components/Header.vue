<template>
  <div class="header">
    <div class="header-content">
      <div class="previous-button-container">
        <img src="~@/assets/previous.png" @click="navigate('previous')">
      </div>
      <div class="logo-container">
        <img src="~@/assets/numenera.webp" @click="navigate('home')">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["showHeader"]),
  },
  methods: {
    navigate(location) {
      if(location === 'previous') {
        if(this.$route.params.player) this.$router.push(`/${this.$route.params.id}`);
        else this.$router.push('/');
      }
      if(location === 'home') this.$router.push('/');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  left: 0;
  width: 100vw;
  padding: .5em 2em;
  margin: 0 auto;
}
.header-content{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  position: relative;
  top: -100px;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 0.5em 2em;
  background-color: rgba(255, 255, 255, .75);
  backdrop-filter: blur(10px);
  transition: 300ms;
}
.header:hover .header-content {
  top: 0px;
}
.previous-button-container{
  text-align: left;
  align-self: center;
  align-items: center;
  img{
    transition: 300ms;
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
    padding: 0;
    height: 32px;
  }
  img:hover{
    background-color: rgba(117, 212, 222, 0.25);
    box-shadow: 0 0 10px 10px rgba(117, 212, 222, 0.25);
  }
}
.logo-container{
  text-align: center;
  align-self: center;
  align-items: center;
  img{
    transition: 300ms;
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
    padding: 0;
    height: 32px;
  }
  img:hover{
    background-color: rgba(117, 212, 222, 0.25);
    box-shadow: 0 0 10px 10px rgba(117, 212, 222, 0.25);
  }
}

</style>
