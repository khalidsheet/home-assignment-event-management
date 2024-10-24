<script setup>
import { toValidEvent } from '@/transformers/toValidEvent';
import { ref } from 'vue';
import { useStore } from 'vuex';
import SnackbarAlert from './SnackbarAlert.vue';

const model = defineModel();
const props = defineProps(['title', 'description', 'eventDetails', 'allowDelete']);
const store = useStore()
const snackbar = ref(false);
const snackbarText = ref('Event has been created successfully');

const onAddEvent = () => {
  store.commit('addEvent', toValidEvent(props.eventDetails));
  model.value = false;
  snackbar.value = true;
}

const onEditEvent = () => {
  store.commit('editEvent', { id: props.eventDetails.id, event: toValidEvent(props.eventDetails) });
  model.value = false;
  snackbar.value = true;
  snackbarText.value = 'Event has been updated successfully';
}

const onDeleteEvent = () => {
  store.commit('deleteEvent', props.eventDetails.id);
  model.value = false;
  snackbar.value = true;
  snackbarText.value = 'Event has been deleted successfully';
}
</script>

<template>
  <v-dialog max-width="500" v-model="model">
    <template v-slot:default="{ isActive }">
      <v-card :title="props.title || 'Dialog'">
        <v-card-text>
          {{ props.description }}
        </v-card-text>
        <div class="px-6">
          <slot></slot>
        </div>
        <v-card-actions class="px-6 mb-2 mt-4 ">
          <div v-if="allowDelete">
            <v-btn text="Delete" @click="onDeleteEvent" variant="flat"
              class="bg-red-100 text-red-500 font-semibold px-4"></v-btn>
          </div>
          <v-spacer></v-spacer>

          <div class="flex gap-x-3">
            <v-btn text="Close" class="text-gray-500" @click="isActive.value = false"></v-btn>

            <template v-if="allowDelete">
              <v-btn text="Update" class="bg-green-500 text-white md:w-32 font-bold" active
                @click="onEditEvent" :disabled="!eventDetails.title"></v-btn>
            </template>
            <template v-else>
              <v-btn text="Save" class="bg-green-500 text-white md:w-32 font-bold" :disabled="!eventDetails.title" active @click="onAddEvent"></v-btn>
            </template>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <SnackbarAlert v-model="snackbar" :text="snackbarText"></SnackbarAlert>
</template>
