<template>
  <div class="container" :style="cssProps">
    <h1>
      {{ `${character?.name} is a ${character?.descriptor} ${character?.type} who ${character?.focus}` }}
    </h1>
    <div class="home">
      <div class="section">
        <div class="inner-section">
            <h2>Special abilities</h2>
            <input :value="character?.specialAbilities" @input="event => text = updateCharacter('specialAbilities', event.target.value)">
        </div>
        <div class="inner-section">
            <h2>Cyphers</h2>
            <input :value="character?.cyphers">
        </div>
      </div>
      <div class="section">
        <div class="inner-section">
            <input :value="character?.name">
            <input :value="character?.descriptor">
            <input :value="character?.type">
            <input :value="character?.focus">
        </div>
        <div class="inner-section">
            <input :value="character?.might">
            <input :value="character?.speed">
            <input :value="character?.int">
        </div>
      </div>
      <div class="section">
        <div class="inner-section">
            <h2>Skills/Inabilities</h2>
            <input :value="character?.skills">
        </div>
        <div class="inner-section">
            <h2>Equipment</h2>
            <input :value="character?.equipment">
        </div>
        <div class="inner-section">
            <h2>Attacks</h2>
            <input :value="character?.attacks">
        </div>
      </div>

      <div class="section">
        <div class="inner-section">
          <h2>PRE</h2>
            <pre>
              {{character}}
            </pre>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadCharacterByCode, updateCharacter } from "@/firebase";

export default {
  name: "CharacterView",
  components: {
    Header,
  },
  data() {
    return {
      character: {},
      cssProps: {
        minHeight: "100vh",
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundAttachment: "fixed",
      },
    };
  },
  mounted() {
    this.getCharSheet();
  },

  
  methods: {
    async getCharSheet() {
      this.character = await useLoadCharacterByCode(this.$route.params.player);
    },
    updateCharacter(slot, value){
      const payload = {...this.character};
      payload[slot] = value;
      const res = updateCharacter(slot, value, this.$route.params.player);
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding-top: 3em;
}
.home {
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 2fr 1fr;
  row-gap: 2em;
  background-color: rgba(55, 55, 55, 0);
  padding-top: 3em;
  margin: 0em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
  text-align: left;
}

.cheatsheet {
  justify-self: center;
  grid-column: 2;
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}

.inner-section {
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 1em;
  padding: 0.5em 2em;
  background-color: rgba(55, 55, 55, 0);
  backdrop-filter: blur(10px);

  ol {
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.5em;
    margin-left: 0;
    img {
      margin-right: 0.5em;
      height: 40px;
      border-radius: 4px;
    }
  }

  a:link,
  a:visited,
  a:active,
  a:hover {
    color: #fff;
    text-decoration: none;
  }
}
.section:nth-child(1) {
  grid-column-start: 2;
}
.section:nth-child(4) {
  grid-column-start: 2;
}

.enchants {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: 1px solid #fff;
}

.enchant-icon {
  width: 60px;
}
</style>
