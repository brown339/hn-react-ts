import 'firebase/database';

import firebase from 'firebase/app';

import Item from '../../models/Item';

const firebaseConfig = {
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const Database = {
  async getNewStories() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const json = await response.json();
    return json;
  },

  watchItems() {
    const ref = db.ref(`/v0/item`);
    return ref;
  },

  async getItemById(id: number): Promise<Item> {
    const snap = await db.ref(`/v0/item/${id}`).get();
    const val = snap.val();
    return val;
  },

  getLatestItem(): firebase.database.Reference {
    const ref = db.ref(`/v0/maxitem`);
    return ref;
  },
};

export default Database;