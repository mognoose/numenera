<template>
  <div class="header" :class="{'docked': dockedHeader}">
    <div class="header-content">
      <div class="previous-button-container">
        <img src="~@/assets/previous.png" @click="navigate('previous')">
        <img src="~@/assets/previous.png" @click="toggleDocked(dockedHeader)" :class="dockedHeader ? 'downwards' : 'upwards'">
      </div>
      <div class="logo-container">
        <img src="~@/assets/numenera.webp" @click="toggleMenu()">
      </div>
      <div class="dice-container">
        <img src="~@/assets/d20.webp" @click="onSetDice('20')">
      </div>
    </div>

    <div class="modal dice-modal" v-if="dice">
      <div class="message">
        <h1>{{ rolling ? `Rolling D${dice}` : roll ? `Rolled ${roll} ( D${dice} )` : `${dice ? 'Click dice to roll D'+dice : 'No dice selected'}`}}</h1>
      </div>
      <div class="dice-frame" @click="rollDice('1')">
        <div class="dice-window" />
        <div class="dice" :class="{ rolling: rolling }">
          <img src="~@/assets/d20.webp">
          <span>{{roll ? roll : '20'}}</span>
        </div>
      </div>
      <div class="action">
        <button @click="dice = null">Done</button>
      </div>
    </div>

    <div class="modal menu-modal" v-if="menuOpen">
      <div class="message">
        <h1>Main Menu</h1>
      </div>
      <div class="menu-content">
        <ul>
          <li><button @click="navigate('previous')">Leave to Character selection</button></li>
          <li><button @click="navigate('home')">Leave to Campaign selection</button></li>
        </ul>
      </div>
      <div class="action">
        <button @click="menuOpen = false">Cancel</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getCampaignByCode, getRoll } from "@/firebase";

export default {
  name: "Header",
  props: {
    char: {
      type: String,
      default: 'unknown',
    },
  },
  data() {
    return {
      menuOpen: false,
      dice: null,
      roll: 1,
      rolling: false,
    }
  },
  computed: {
    ...mapGetters(["showHeader", "dockedHeader"]),
  },
  methods: {
    ...mapMutations(['setDockedHeader']),
    navigate(location) {
      if(location === 'previous') {
        if(this.$route.params.player) this.$router.push(`/${this.$route.params.id}`);
        else this.$router.push('/');
      }
      if(location === 'home') this.$router.push('/');
    },

    toggleDocked(docked){
      this.setDockedHeader(!docked)
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if(this.menuOpen) this.dice = null;
    },
    
    onSetDice(d) {
      this.dice = d
      this.roll = false
      this.menuOpen = false
    },

    async rollDice(amount) {
      if (this.rolling) return
      this.rolling = true
      this.roll = false
      const campaign = await getCampaignByCode(this.$route.params.id);
      const res = await getRoll(this.char, 20, campaign.diceChannel);
      this.roll = res.data.result
      setTimeout(() => {
        this.rolling = false
      }, 1200)
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
  max-width: 1056px;
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
  box-shadow: 0 0 10px 10px rgba(121, 141, 143, 0.25);

}
.header:hover .header-content {
  top: 0px;
}

.docked {
  padding: 0;
  .header-content{
    box-sizing: border-box;
    width: 100vw;
    max-width: 1056px;
    top: -10px;
    border-radius: 0;
  }
  .header-content:hover{
    top: -10px;
  }
}

.docked:hover .header-content {
  top: -10px;
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
    margin-right: 1rem;
  }
  img:hover{
    background-color: rgba(117, 212, 222, 0.25);
    box-shadow: 0 0 10px 10px rgba(117, 212, 222, 0.25);
  }
  .upwards {
    transform: rotate(90deg);
  }
  .downwards {
    transform: rotate(-90deg);
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
.dice-container{
  text-align: right;
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

.modal {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  border: 1px solid #fff;
  position: relative;
  top: 10vh;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 0.5em 2em;
  background-color: rgba(255, 255, 255, .75);
  box-shadow: 0 0 10px 10px rgba(121, 141, 143, 0.25);
  backdrop-filter: blur(30px);
  transition: 300ms;
  width: 530px;
  height: 530px;
  margin: 0 auto;
  
  img {
    grid-row-start: 2;
    grid-column-start: 2;
  }
  .message {
    grid-column-start: 2;
  }
  .menu-content {
    grid-row-start: 2;
    grid-column-start: 2;

    ul, ul li {
      margin:0;
      padding: 0;
      text-indent: 0;
      list-style-type: none;
    }
    button{
      width: 100%;
    }
  }

  .dice-frame {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    grid-row-start: 2;
    grid-column-start: 2;
    width: 100%;
    height: 100%;
    border: 6px solid rgba(121, 141, 143, 1);
    border-radius: 50%;
    overflow: hidden;
  }
  .dice-window {
    box-sizing: border-box;
    position: relative;
    z-index: 100;
    top: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    border: 6px solid rgba(121, 141, 143, 0.25);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0) 25%, rgba(178,207,209,0.75) 100%);
  }
  .rolling {
    animation-name: rollthedice;
    animation-duration: 1.25s;
    animation-timing-function: ease-out;
  }
  .dice {
    position: relative;
    top: -80%;

    span {
      display: block;
      position: relative;
      top: -128px;
      left: 142px;
      font-size: 3em;
      background: #000;
      border-radius: 75% 75% 0 0;
      height:50px;
      width:55px;
    }

  }

  @keyframes rollthedice {
    0%   { top: -200%; left: 25%; transform: rotate(-290deg);}
    15%  { top: 0%; left: -50%; transform: rotate(-180deg);}
    30%  { top: -100%; left: 25%; transform: rotate(240deg);}
    40%  { top: 50%; left: -25%; transform: rotate(320deg);}
    60%  { top: -70%; left: 50%; transform: rotate(-20deg);}
    80%  { top: -60%; left: -70%; transform: rotate(-145deg);}
    100% { top: -80%; left: 0%; transform: rotate(0deg);}
  }

  .action {
    align-self: center;

    grid-row-start: 3;
    grid-column-start: 2;
  }
}

</style>
