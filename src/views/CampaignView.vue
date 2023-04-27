<template>
  <div class="container blur-bg">
    <h1>
      {{ `${campaign.title} by ${campaign.by}` }}
    </h1>
    <div class="home">
      <div class="section">
        <h2>Story ( sessions: {{ campaign.sessions }} )</h2>
        <div id="story" class="inner-section" >
          <div
            id="story-text"
            :contenteditable="readMore"
            @input="onSave"
            :style="readMore ? 'max-height: 1000px; overflow: auto; height: auto; min-height: 90px' : `height: 90px`"
            @click="readMore = true"
          >
            {{campaign.story}}
          </div>
          <div class="sessions" v-if="readMore">
            Sessions: <button @click="onSessionModify(-1)"> - </button> {{ campaign.sessions }} <button @click="onSessionModify(1)"> + </button>
          </div>
          <span id="read-more" @click="readMore = !readMore">{{readMore ? 'Show less' : 'Read more'}}</span>
        </div>
      </div>
      <div class="section">
        <h2>Characters ( {{chars.length}} )</h2>
        <div class="inner-section clickable" v-for="char in chars" :key="char.id" @click="onSelect(char.id)">
          <h2>{{char.name || 'Anonymous'}}</h2>
          <h3>{{`${char.descriptor || 'An'} ${char.type || 'Unknown'} who ${char.focus || 'is unknown'}`}}</h3>
        </div>
        <div class="inner-section clickable" @click="onAddCharacter()">
          <h2>+ Add new character</h2>
        </div>
      </div>
    </div>
    <Header />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getCampaignByCode, getCharsByCampaign, updateCampaign, addCharacter } from "@/firebase";

export default {
  name: "CampaignView",
  components: {
    Header,
  },
  data() {
    return {
      campaign: [],
      chars: [],
      readMore: false,
    };
  },
  async mounted() {
      this.campaign = await getCampaignByCode(this.$route.params.id);
      this.chars = await getCharsByCampaign(this.$route.params.id);
      if(this.campaign.players !== this.chars.length) {
        updateCampaign('players', this.chars.length, this.$route.params.id)
      }

  },
  methods: {
    async onSelect(player) {
      this.$router.push(`/${this.$route.params.id}/${player}`);
    },
    async onSave(e) {
      const res = await updateCampaign('story', e.target.innerText, this.$route.params.id);
    },
    async onAddCharacter(){
      const res = await addCharacter(this.$route.params.id)
      console.log("addCharacter:", res);
      const player = res.id;
      this.$router.push(`/${this.$route.params.id}/${player}`)
    },
    async onSessionModify(amount) {
      this.campaign.sessions = this.campaign.sessions + amount;
      const res = await updateCampaign('sessions', this.campaign.sessions, this.$route.params.id);
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

#story {
  white-space: break-spaces;
  overflow: clip;
  
  #story-text {
    box-sizing: border-box;
    margin-bottom: 2rem;
    overflow: hidden;
    transition: 250ms;
  }

  #story-text:hover {
    background-color: rgba(255, 255, 255, .45);
    box-shadow: 0px 0px 20px 10px rgba(255, 255, 255, .55);
  }

  .sessions {
    margin-bottom: 2rem;
  }

  #read-more {
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: rgba(255, 255, 255, .0);
    padding: .5rem 2rem;
    cursor: pointer;
    transition: 250ms;
  }

  #read-more:hover {
    background-color: rgba(255, 255, 255, .45);
    box-shadow: 0px 0px 20px 10px rgba(255, 255, 255, .55);
  }
}
</style>
