<template>
  <q-page>
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
      <q-item class="q-py-md" v-for="qweet in qweets" :key="qweet.date">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle2">
            <strong> Zammie Code </strong>
            <span class="text-grey-7">@code_zammie99</span>
          </q-item-label>
          <q-item-label class="qweet-content text-body2">
            {{ qweet.content }}
          </q-item-label>
          <div class="row justify-between q-mt-sm qweet-icons">
            <q-btn flat round color="grey" size="sm" icon="far fa-comment" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
            <q-btn flat round color="grey" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>
        <q-item-section side top> {{ filtered(qweet.date) }} </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { formatDistance } from "date-fns";

// const qweets =

export default {
  name: "HomePage",

  setup() {
    const newQweet = ref("");
    const qweets = ref([
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequuntur quas earum ipsam est enim accusantium tenetur laudantium sunt ducimus culpa, quo voluptas. Aperiam sunt corrupti iusto dolorum cumque libero porro.",
        date: 1655494629222,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequuntur quas earum ipsam est enim accusantium tenetur laudantium sunt ducimus culpa, quo voluptas. Aperiam sunt corrupti iusto dolorum cumque libero porro.",
        date: 1655494629222,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequuntur quas earum ipsam est enim accusantium tenetur laudantium sunt ducimus culpa, quo voluptas. Aperiam sunt corrupti iusto dolorum cumque libero porro.",
        date: 1655494629222,
      },
      {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequuntur quas earum ipsam est enim accusantium tenetur laudantium sunt ducimus culpa, quo voluptas. Aperiam sunt corrupti iusto dolorum cumque libero porro.",
        date: 1655494629222,
      },
    ]);

    // this function converts the date timestamp
    function filtered(val) {
      return formatDistance(val, new Date());
    }

    // create and submit new Qweet
    function createNewQweet() {
      // using push adds the newQweet to the bottom ,
      // to add to the top use the unshift function
      // qweets.value.push({ content: newQweet.value, date: Date.now() });

      qweets.value.unshift({ content: newQweet.value, date: Date.now() });
      newQweet.value = "";
    }

    return {
      newQweet,
      qweets,
      filtered,
      createNewQweet,
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
