import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebase.config';

import {ref, onUnmounted } from 'vue';

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const campaign = db.collection('campaign');
const players = db.collection('players');

export const getCampaignByCode = async code => {
    const res = await campaign.doc(code).get();
    return res.exists ? res.data() : null;
}

export const getCharsByCampaign = async code => {
    let res = []
    await players.where("campaign", "==", code)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            res.push({id: doc.id, ...doc.data()});
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    return res;
}

export const useLoadCharacterByCode = async (id) => {
    const character = ref()
    const close = await players.doc(id).onSnapshot(snap => {
        character.value = snap.data();
        console.log("data: ", character.value);
    })
    onUnmounted(close);
    console.log("final: ", character.value);
    return character
}

// export const useLoadCharacterByCode = (player) => {
//     const character = ref([])
//     const close = players.onSnapshot(snapshot => {
//         character.value = snapshot.doc(player).map(doc => ({ id: doc.id, ...doc.data()}))
//     })
//     onUnmounted(close);
//     return character;
// }

export const updateCharacter = (slot, value, campaignId, player) => {
    console.log(slot, value, campaignId, player);
    const campaignData = campaign.doc(campaignId)
    return campaignData.set({
        players: []
    })
    // return campaignData.update({
    //     players[player]: data 
    // })
    // return res
}