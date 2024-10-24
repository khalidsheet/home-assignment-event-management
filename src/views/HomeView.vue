<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
import { nextTick, ref } from 'vue';
import EventModal from '@/components/EventModal.vue';
import dayjs from 'dayjs';
import { statusList } from '@/constants/statusList';
import { useStore } from 'vuex';

const store = useStore();
const events = ref(store.state.events);

const dialog = ref(false)
const editDialog = ref(false)

const eventDetails = ref({
  id: 0,
  title: '',
  content: '',
  date: '',
  status: '',
  location: '',
});
const eventDetailsRules = ref({
  title: [
    v => !!v || 'Event Name is required',
    v => (v && v.length <= 50) || 'Event Name must be less than 50 characters'
  ]
});


store.watch(() => store.state.searchTerm, (value) => {
  events.value = store.state.events.filter(event => {
    if(value === '') return true;
    return event.title.toLowerCase().includes(value.toLowerCase())
  });
});

store.watch(() => store.state.events, async (value) => {
  console.log(value);
  await nextTick();
  events.value = value;
});

const onCreateEvent = (date) => {
  eventDetails.value = {
    id: 0,
    title: '',
    content: '',
    date: date,
    status: '',
    location: '',
  }

  if (dayjs(date).isSame(dayjs(), 'day')) {
    eventDetails.value.status = "Ongoing";
  }

  if (dayjs(date).isAfter(dayjs(), 'day')) {
    eventDetails.value.status = "Upcoming";
  }

  if (dayjs(date).isBefore(dayjs(), 'day')) {
    eventDetails.value.status = "Completed";
  }
  eventDetails.value.date = date;

  dialog.value = true;
}

const onEditEvent = (event) => {
  console.log(event);
  eventDetails.value = event;
  eventDetails.value.date = new Date(event.date);
  editDialog.value = true;
}
</script>

<template>
  <main class="calendar-view overflow-hidden">
    <VueCal hide-view-selector active-view="month" events-on-month-view="short" @cell-click="onCreateEvent"
      @event-click="onEditEvent" :events="events" :time="false" />
    <EventModal v-model="dialog" title="Create New Event"  :event-details="eventDetails">
      <template v-slot:default>
        <v-form @submit.prevent>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="eventDetails.title" label="Event Name" required
                :rules="eventDetailsRules.title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-input width="100%" prepend-icon="" v-model="eventDetails.date" label="Event Date"></v-date-input>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="eventDetails.location" v-on:update:model-value="console.log" label="Event Location" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="eventDetails.content" label="Event Description" required></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select :items="statusList" v-model:model-value="eventDetails.status" label="Status"></v-select>
            </v-col>

          </v-row>
        </v-form>
      </template>

    </EventModal>
    <EventModal v-model="editDialog" :allow-delete="true" :title="eventDetails.title"
      :event-details="eventDetails">
      <template v-slot:default>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="eventDetails.title" label="Event Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-input width="100%" prepend-icon="" v-model="eventDetails.date" label="Event Date"></v-date-input>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="eventDetails.location" label="Event Location"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="eventDetails.content" label="Event Description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select :items="statusList" v-model:model-value="eventDetails.status" label="Status"></v-select>
            </v-col>

          </v-row>
        </v-form>
      </template>

    </EventModal>
  </main>
</template>
<style>
.vuecal__cell--has-events {
  @apply bg-gray-100;
}

.calendar-view {
  height: calc(100dvh - 64px);
}

.vuecal__event {
  @apply rounded-full max-w-[90%] px-2 mx-2 flex items-center my-1 h-6;
}

.vuecal__event.completed {
  @apply bg-green-200 text-green-600;
}

.vuecal__event.completed::before {
  content: '';
  @apply inline-block text-center w-3 h-3 mr-2 rounded-full bg-green-500;
}

.vuecal__event.ongoing {
  @apply bg-yellow-200 text-yellow-600;
}

.vuecal__event.ongoing::before {
  content: '';
  @apply inline-block text-center w-3 h-3 mr-2 rounded-full bg-yellow-500;
}

.vuecal__event.upcoming {
  @apply bg-blue-200 text-blue-600;
}

.vuecal__event.upcoming::before {
  content: '';
  @apply inline-block text-center w-3 h-3 mr-2 rounded-full bg-blue-500;
}

.vuecal__event.cancelled {
  @apply bg-red-200 text-red-600;
}

.vuecal__event.cancelled::before {
  content: '';
  @apply inline-block text-center w-3 h-3 mr-2 rounded-full bg-red-500;
}
</style>
