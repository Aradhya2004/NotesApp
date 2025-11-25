<template>
  <div class="min-h-[300px] max-h-[340px] rounded bg-gray-500 p-2 text-white">
    <div class="flex flex-row-reverse">
      <font-awesome-icon icon="trash" size="lg" @click="deleteNoteModal" />
      <font-awesome-icon icon="pen-square" size="lg" @click="editNoteModal" />
    </div>
    <div>
      <h1>{{ note.title }}</h1>
      <p>{{ note.point }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Note } from "../common.interface";

const props = defineProps<{
  note: Note;
}>();

const emit = defineEmits<{
  (e: "showdeletemodal", value: Note): void;
  (e: "showeditmodal", value: Note): void;
}>();

const deleteNoteModal = () => {
  emit("showdeletemodal", props.note);
};

const editNoteModal = () => {
  emit("showeditmodal", props.note);
};
</script>
