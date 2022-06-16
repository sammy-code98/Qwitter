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
          unelevated
          rounded
          color="primary"
          label="Qweet"
          no-caps
          :disable="!newQweet"
        />
      </div>
    </div>
    <q-separator size="10px" color="grey-2"  class="divider-border"/>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HomePage",
  setup() {
    return {
      newQweet: ref(""),
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
</style>
