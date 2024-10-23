<script setup>
import dayjs from 'dayjs';
import { useStore } from 'vuex';

  const model = defineModel();
  const props = defineProps(['title', 'description', 'date'])
  const store = useStore()

  const onAddEvent = () => {
    store.commit('addEvent', {
      title: 'New Event',
      date: props.date,
      description: 'This is a new event',
      start: dayjs(props.date).format('YYYY-MM-DD HH:mm'),
      end: dayjs(props.date).add(1, 'hour').format('YYYY-MM-DD HH:mm')
    });
    model.value = false;
  }

</script>

<template>
  <v-dialog max-width="500" v-model="model">

    <template v-slot:default="{ isActive }">
      <v-card :title="props.title || 'Dialog'">
        <v-card-text>
          {{ props.description  }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="isActive.value = false"></v-btn>
          <v-btn text="Save" active @click="onAddEvent"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
