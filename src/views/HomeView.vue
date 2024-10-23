<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
import { ref } from 'vue';
import CreateEventModal from '@/components/CreateEventModal.vue';
const dialog = ref(false)
const selectedDate = ref(null);

const onEventClick = (event) => {
  dialog.value = true;
  console.log(event)
}

const onCreateEvent = (date) => {
  dialog.value = true;
  console.log('Create Event', date);
  selectedDate.value = date;

}
</script>

<template>
  <main class="h-screen">
    <VueCal hide-view-selector active-view="month" events-on-month-view="short" @cell-click="onCreateEvent" :events="$store.state.events"  />
    <CreateEventModal v-model="dialog" title="Create New Event" :date="selectedDate"/>
  </main>
</template>
