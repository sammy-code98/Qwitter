<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen" :thumb-style="thumbStyle">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-qweet"
            bottom-slots
            v-model="newQweet"
            placeholder="What's happening?"
            counter
            autogrow
            maxlength="280"
            @keyup.enter="createNewQweet()"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            class="q-mb-lg"
            @click="createNewQweet"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
            :disable="!newQweet"
          />
        </div>
      </div>
      <q-separator size="10px" color="grey-2" class="divider-border" />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow "
        >
          <q-item class="q-py-md" v-for="qweet in qweets" :key="qweet.id">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2">
                <strong> Zammie Code </strong>
                <span class="text-grey-7"
                  >@code_zammie99 <br class="lt-md" />&bull;
                  {{ filtered(qweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body2">
                {{ qweet.content }}
              </q-item-label>
              <div class="row justify-between q-mt-sm qweet-icons">
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />
                <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  @click="deleteQweet(qweet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default {
  name: "HomePage",

  setup() {
    const newQweet = ref("");
    const qweets = ref([]);

    // this function converts the date timestamp
    function filtered(val) {
      return formatDistance(val, new Date());
    }

    // create and submit new Qweet
    async function createNewQweet() {
      // using push adds the newQweet to the bottom ,
      // to add to the top use the unshift function
      // qweets.value.push({ content: newQweet.value, date: Date.now() });
      // qweets.value.unshift({ content: newQweet.value, date: Date.now() });

      // pushing qweets to firebase
      const docRef = await addDoc(collection(db, "qweets"), {
        content: newQweet.value,
        date: Date.now(),
      });
    }

    async function deleteQweet(qweet) {
      // get the index/id of the specific tweet you want to delete
      // let qweetId = qweet.date;
      // let index = qweets.value.findIndex((qweet) => qweet.date === qweetId);
      // qweets.value.splice(index, 1);
      await deleteDoc(doc(db, "qweets", qweet.id));
    }

    // this whole part run on app mount and if firebase notice any chnages
    onMounted(() => {
      const q = query(collection(db, "qweets"), orderBy("date"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New qweet: ", qweetChange);
            qweets.value.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange);
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", qweetChange);
            let index = qweets.value.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            qweets.value.splice(index, 1);
          }
        });
      });
    });

    return {
      newQweet,
      qweets,
      filtered,
      createNewQweet,
      deleteQweet,

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#32a4f2",
        width: "3px",
        opacity: 0.75,
      },
    };
  },
};
</script>

<style lang="sass">
.new-qweet
  textarea
      font-size:19px
      line-height: 1.4rem !important


.divider-border
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4


.qweet-content
  white-space: pre-line

.qweet-icons
  margin-left : -5px
</style>
