import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebase.config';

import {ref, onUnmounted } from 'vue';

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const campaign = db.collection('campaign');
const players = db.collection('players');

export const useLoadCampaigns = async () => {
    const snapshot = await campaign.get()
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

export const getCampaignByCode = async code => {
    const res = await campaign.doc(code).get();
    return res.exists ? res.data() : null;
}

export const updateCampaign = async (slot, value, id) => {
    const payload = {}
    payload[slot] = value
    const res = await campaign.doc(id).update(payload)
    return res
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

export const useLoadCharacterByCode = (id) => {
    const character = ref()
    const close = players.doc(id).onSnapshot(snap => {
        character.value = snap.data();
    })
    onUnmounted(close);
    return character
}

export const updateCharacter = async (slot, value, player) => {
    const payload = {}
    payload[slot] = value
    const res = await players.doc(player).update(payload)
    return res
}