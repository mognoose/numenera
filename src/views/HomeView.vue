<template>
  <div class="container blur-bg">
    <Header />
    <div class="home">
      <div class="campaign-list card mt-4">
        <table>
          <thead>
            <tr>
              <th scope="col">Campaign</th>
              <th scope="col">By</th>
              <th scope="col">Players</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="campaign in campaigns" :key="campaign.id" @click="onView(campaign.id)">
              <td>{{ campaign.title }}</td>
              <td>{{ campaign.by }}</td>
              <td>{{ campaign.players || 0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadCampaigns } from "@/firebase";

export default {
  name: "HomeView",
  components: {
    Header,
  },
  data() {
    return {
      campaigns: []
    }
  },
  async mounted() {
    const campaigns = await useLoadCampaigns();
    this.campaigns = campaigns;
  },
  methods: {
    async onView(id) {
      this.$router.push(`/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>

.home {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  row-gap: 2em;
  padding: 3em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
}

.campaign-list {
  justify-self: center;
  grid-column: 2;
  backdrop-filter: blur(20px);
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}
tbody tr {
  background-color: rgba(255, 255, 255, 0);
  transition: 500ms;
}

tbody tr:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
