<template>
  <div class="container">
    <div class="fields">
      <div v-for="field, i in fields" :key="i">
        <input
          v-if="field.type === 'input'"
          :value="character?.[field.value]"
          @input="event => text = updateCharacter(field.value, event.target.value)"
          @wheel.prevent="event => text = changePoint(field.scrollable, field.value, event.target.value, event.deltaY)"
          @click="activate($event)"
          :class="inputClasses(field)"
          :style="field.styles"
          :type="field.scrollable ? 'number' : 'text'"
        />
        <textarea
          v-if="field.type === 'textarea'"
          :value="character?.[field.value]"
          @click="checkMark(field.value, field.type)"
          @input="event => text = updateCharacter(field.value, event.target.value)"
          :style="field.styles"
        />
        <span
          v-if="field.type === 'span'"
          :value="character?.[field.value]"
          @click="checkMark(field.value, field.type)"
          v-html="field.type === 'span' ? (character?.[field.value] ? '✔' : ' ') : ''"
          :style="field.styles"
        />
      </div>
    </div>
    <Header :char="character?.name" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadCharacterByCode, updateCharacter } from "@/firebase";
import { mapGetters } from 'vuex';

export default {
  name: "CharacterView",
  components: {
    Header,
  },
  data() {
    return {
      character: {},
      delayed: false,
      activated: false,
      fields: [
        {type: 'textarea', value: 'specialAbilities', styles: 'left:50px; top:65px; width: 270px; height: 350px;'},

        {type: 'input', value: 'cypherlimit', scrollable: true, circle: true, styles: 'left:25px; top:461px;' },
        {type: 'textarea', value: 'cyphers', styles: 'left:50px; top:530px; width: 270px; height: 250px;' },

        {type: 'textarea', value: 'background', styles: 'left:50px; top: 878px; height: 310px; width: 275px; text-transform: none;' },

        {type: 'textarea', value: 'crafting', styles: 'left:70px; top:1245px; width:260px; height:280px;' },
        {type: 'input', value: 'materials', scrollable: true, circle: true, styles: 'left:29px; top:1530px' },
        {type: 'input', value: 'parts', scrollable: true, circle: true, styles: 'left:276px; top:1528px' },

        {type: 'input', value: 'name', styles: 'left:410px; top:57px; width: 200px;' },
        {type: 'input', value: 'descriptor', styles: 'left:405px; top:136px; width: 100px; text-align: right;' },
        {type: 'input', value: 'type', styles: 'left:510px; top:136px; width: 100px; text-align: left;' },
        {type: 'input', value: 'focus', styles: 'left:410px; top:200px; width: 170px;' },

        {type: 'input', value: 'might', scrollable: true, styles: 'left:447px; top:241px; font-size: 2em; width: 2em;' },
        {type: 'input', value: 'mightpool', scrollable: true, circle: true, styles: 'left:383px; top:235px;' },
        {type: 'input', value: 'mightede', scrollable: true, circle: true, styles: 'left:382px; top:295px;' },
        
        {type: 'input', value: 'speed', scrollable: true, styles: 'left:447px; top:368px; font-size: 2em; width: 2em;' },
        {type: 'input', value: 'speedpool', scrollable: true, circle: true, styles: 'left:382px; top:360px;' },
        {type: 'input', value: 'speededge', scrollable: true, circle: true, styles: 'left:382px; top:420px;' },
        
        {type: 'input', value: 'int', scrollable: true, styles: 'left:447px; top:495px; font-size: 2em; width: 2em;' },
        {type: 'input', value: 'intpool', scrollable: true, circle: true, styles: 'left:382px; top:487px;' },
        {type: 'input', value: 'intedge', scrollable: true, circle: true, styles: 'left:382px; top:548px;' },
        
        {type: 'input', value: 'armorcost', scrollable: true, circle: true, styles: 'left:580px; top:391px;' },
        {type: 'input', value: 'armor', scrollable: true, styles: 'left:642px; top:393px; width: 25px; font-size: 1.2em;' },
        
        {type: 'input', value: 'tier', scrollable: true, styles: 'left:393px; top:640px; width: 50px; font-size: 1.2em;' },
        {type: 'input', value: 'effort', scrollable: true, styles: 'left:476px; top:640px; width: 50px; font-size: 1.2em;' },
        {type: 'input', value: 'xp', scrollable: true, styles: 'left:558px; top:640px; width: 50px; font-size: 1.2em;' },

        {type: 'input', value: 'recovery', scrollable: true, circle: true, styles: 'left:489px; top:732px;' },
        
        {type: 'span', value: 'oneaction', styles: 'left:388px; top:722px;' },
        {type: 'span', value: 'tenmins', styles: 'left:443px; top:739px;' },
        {type: 'span', value: 'onehour', styles: 'left:565px; top:737px;' },
        {type: 'span', value: 'tenhours', styles: 'left:631px; top:710px;' },
        {type: 'span', value: 'debilitated', styles: 'left:630px; top:578px;' },
        {type: 'span', value: 'impaired', styles: 'left:630px; top:530px;' },

        {type: 'textarea', value: 'skills', styles: 'left:725px; top:75px; height: 220px; width: 270px;' },

        {type: 'textarea', value: 'equipment', styles: 'left:725px; top:385px; height: 200px; width: 270px;' },
        {type: 'input', value: 'shins', scrollable: true, circle: true, styles: 'left:960px; top:301px;' },

        {type: 'textarea', value: 'attacks', styles: 'left:745px; top:645px; width: 270px; height: 120px;' },

        {type: 'input', value: 'name', styles: 'left:447px; top:815px;' },

        {type: 'span', value: 'increaseCApabilities', styles: 'left:387px; top:1388px;' },
        {type: 'span', value: 'extraEffort', styles: 'left:407px; top:1461px;' },
        {type: 'span', value: 'moveTowardPerfection', styles: 'left:503px; top:1532px;' },
        {type: 'span', value: 'skillTraining', styles: 'left:608px; top:1461px;' },
        {type: 'span', value: 'other', styles: 'left:621px; top:1388px;' },

        {type: 'textarea', value: 'notes', styles: 'left:720px; top:900px; width: 260px; height: 370px; text-transform: none;' },

        {type: 'textarea', value: 'followers', styles: 'left:720px; top:1320px; width: 260px; height: 240px; text-transform: none;' },
      ],
    };
  },
  computed: {
    ...mapGetters(['dockedHeader'])
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.character = await useLoadCharacterByCode(this.$route.params.player);
    },
    updateCharacter(slot, value){
      const payload = {...this.character};
      payload[slot] = value;
      const res = updateCharacter(slot, value, this.$route.params.player);
    },
    changePoint(scrollable, stat, value, event){
      if(!this.activated) return;
      if(!scrollable) return;
      if(this.delayed) return;
      if(!value) value = 0;
      this.delayed = true;
      const newValue = parseInt(value) + (event < 0 ? 1 : -1);
      this.updateCharacter(stat, newValue);
      setTimeout(()=>this.delayed = false, 250);
    },
    checkMark(slot, type){
      if(type !== 'span') return
      const newValue = !this.character[slot];
      this.updateCharacter(slot, newValue);
    },
    activate(e){
      this.activated = !this.activated;
      e.target.classList.toggle('activated');
    },
    inputClasses(field){
      if(field.circle) return 'round-input'
      if(field.scrollable) return 'scrollable-input'
      return ''
    },

  },
};
</script>

<style lang="scss" scoped>

.container {
  box-sizing: border-box;
  width: 1056px;
}
.lower {
  top: 10px;
}
.fields {
  position: relative;
  
  & > * {
    
    & > * {
      position: absolute;
      border: 0px;
    }

    textarea{
      text-align: left;
    }
    textarea:hover {
      box-shadow: inset 0 0 30px rgba(120, 23, 90, 0.15);
    }
    input:hover{
      border-bottom: 3px solid rgb(120, 23, 90);
    }
    .activated {
      color: rgb(203, 0, 139);
    }
    span {
      padding: 20px;
      display: block;
      width: 10px;
      height: 10px;
      cursor: pointer;
      border-radius: 50%;
    }
    span:hover{
      background-color: rgba(255, 255, 255, .45);
      box-shadow: 0 0 20px 15px rgba(255, 255, 255, .45);
    }
    .round-input{
      position: absolute;
      width: 35px;
      height: 35px;
      border: 3px solid rgba(255, 255, 255, 0);
      border-radius: 50%;
      cursor: pointer;
    }
    .scrollable-input{
      border: 0px solid #FFF;
      border-radius: 50%;
      cursor: pointer;
    }
    .scrollable-input:hover{
      // box-shadow: inset 0 0 10px 0px rgba(120, 23, 90, 0.15);
      text-shadow: 0 0 4px rgba(203, 0, 139, .5);
      border: 0px solid #FFF;
    }
    .round-input:hover{
      border: 3px solid rgb(120, 23, 90);
    }
    .scrollable-input::before {
      content: "add";
    }
  }
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}

</style>
