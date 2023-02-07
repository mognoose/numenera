<template>
  <div class="container blur-bg" :style="cssProps">
    <h1>
      {{ `${campaign.title} by ${campaign.by}` }}
    </h1>
    <div class="home">
      <div class="section">
        <h2>Story</h2>
        <div class="inner-section" contenteditable @input="onSave">
          {{campaign.story}}
        </div>
      </div>
      <div class="section">
        <h2>Characters</h2>
        <div class="inner-section clickable" v-for="char in chars" :key="char.id" @click="onSelect(char.id)">
          <h2>{{char.name}}</h2>
          <h3>{{`${char.descriptor} ${char.type} who ${char.focus}`}}</h3>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getCampaignByCode, getCharsByCampaign, updateCampaign } from "@/firebase";

export default {
  name: "CampaignView",
  components: {
    Header,
  },
  data() {
    return {
      campaign: [],
      chars: [],
      cssProps: {
        minHeight: "100vh",
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundAttachment: "fixed",
      },
    };
  },
  async mounted() {
      this.campaign = await getCampaignByCode(this.$route.params.id);
      this.chars = await getCharsByCampaign(this.$route.params.id);

  },
  methods: {
    async onSelect(player) {
      this.$router.push(`/${this.$route.params.id}/${player}`);
    },
    async onSave(e) {
      console.log(e.target.innerText);
      const res = updateCampaign('story', e.target.innerText, this.$route.params.id);
      console.log(res);
    }
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
  grid-template-columns: 1fr 10fr 1fr;
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

.inner-section {
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 0.5em 2em;
  background-color: rgba(255, 255, 255, .25);
  backdrop-filter: blur(10px);
  transition: 250ms;
  margin-top: 1em;

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
.clickable:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, .75);
}
.section {
  padding: .5em
}

.section:nth-child(1) {
  grid-column-start: 2;
}
.section:nth-child(2) {
  grid-column-start: 2;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  display: grid;
  div:nth-of-type(1){
    grid-column-start: 1;
  }
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
