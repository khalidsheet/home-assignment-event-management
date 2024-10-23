<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
import { ref } from 'vue';

const events = ref([
  {
    start: '2024-10-16 10:30',
    end: '2024-10-16 11:30',
    title: 'Doctor appointment',
    content: '<i class="icon material-icons">local_hospital</i>',
    class: 'bg-red-400'
  }])

</script>

<template>
  <main class="h-screen">
    <VueCal
      hide-view-selector
      active-view="month"
      :events="events"
     />
  </main>
</template>
