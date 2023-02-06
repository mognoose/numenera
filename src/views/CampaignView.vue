<template>
  <div class="container" :style="cssProps">
    <h1>
      {{ `${campaign.title} by ${campaign.by}` }}
    </h1>
    <div class="home">
      <div class="section">
        <h2>Characters</h2>
        <div class="inner-section clickable" v-for="char in chars" :key="char.id" @click="onSelect(char.id)">
          <h2>{{char.name}}</h2>
          <h3>{{`${char.descriptor} ${char.type} who ${char.focus}`}}</h3>
          <!-- <pre>
            {{campaign.players}}
          </pre> -->
        </div>
      </div>
      <div class="section">
        <h2>Story</h2>
        <div class="inner-section">
          <p>{{campaign.story}}</p>
        </div>

        <h2>PRE</h2>
        <div class="inner-section">
          <pre>{{chars}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getCampaignByCode, getCharsByCampaign } from "@/firebase";

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
  grid-template-columns: .5fr 2fr 4fr 2fr .5fr;
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
  background-color: rgba(55, 55, 55, 0);
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
  background-color: rgba(55, 55, 55, .5);
}
.section {
  padding: .5em
}

.section:nth-child(1) {
  grid-column-start: 2;
}
.section:nth-child(5) {
  grid-column-start: 1;
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
