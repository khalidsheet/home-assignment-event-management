<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

 const store = useStore();
 const search = ref('');

 watch(search, (value) => {
   store.commit('updateSearchTerm', value);
 });
</script>

<template>
  <header class="h-16 flex justify-between items-center px-6">
    <h1 class="font-bold">Interactive Calendar</h1>
    <div class="h-full flex items-center w-96">
        <input v-model="search" placeholder="Search for events..." class="w-full px-4 py-2 rounded-full outline-none bg-gray-100" />
    </div>
  </header>
</template>
