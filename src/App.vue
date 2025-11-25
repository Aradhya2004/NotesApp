<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type newNote } from "./common.interface";
import { type Note } from "./common.interface";
import NoteCard from "./components/NoteCard.vue";
import NotesModal from "./components/NotesModal.vue";
import DeleteModal from "./components/DeleteModal.vue";

const showModal = ref(false);
const showDeleteModal = ref(false);
const notes = ref<Array<Note>>([]);
const selectedNote = ref({ id: 0, title: "", point: "" } as Note);
const isNoteEdit = ref(false);

const STORAGE_KEY = "notes-history";

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
};

const loadFromLocalStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    notes.value = JSON.parse(stored);
  }
};

// Load notes on component mount
onMounted(() => {
  loadFromLocalStorage();
});

const openAddNoteModal = () => {
  showModal.value = true;
  isNoteEdit.value = false;
  selectedNote.value = { id: 0, title: "", point: "" } as Note;
};

const updateShowModal = (e: boolean) => {
  showModal.value = e;
  isNoteEdit.value = false;
};

const openDeleteModal = (e: Note) => {
  selectedNote.value = notes.value.find((note) => note.id === e.id) as Note;
  showDeleteModal.value = true;
};

const openEditModal = (e: Note) => {
  isNoteEdit.value = true;
  selectedNote.value = notes.value.find((note) => note.id === e.id) as Note;
  showModal.value = true;
};

const updateDeleteModal = (e: boolean) => {
  showDeleteModal.value = e;
};

const addNote = (note: newNote) => {
  const newnote: Note = {
    id: notes.value.length + 1,
    title: note.title,
    point: note.point,
  };

  notes.value.push(newnote);
  saveToLocalStorage();
};

const editNote = (note: Note) => {
  const selectedIndex = notes.value.findIndex(
    (el) => el.id === selectedNote.value.id
  );

  if (selectedIndex !== -1) {
    notes.value[selectedIndex] = note;
    saveToLocalStorage();
  }

  selectedNote.value = { id: 0, title: "", point: "" } as Note;
  isNoteEdit.value = false;
};

const deleteNote = () => {
  const selectedIndex = notes.value.findIndex(
    (el) => el.id === selectedNote.value.id
  );

  if (selectedIndex !== -1) {
    notes.value.splice(selectedIndex, 1);
    saveToLocalStorage();
  }

  selectedNote.value = { id: 0, title: "", point: "" } as Note;
};
</script>

<template>
  <div class="min-h-[100vh] bg-dark-900 grid grid-cols-3 gap-3">
    <NoteCard
      @showdeletemodal="openDeleteModal"
      v-for="note in notes"
      @showeditmodal="openEditModal"
      :note="note"
    />
    <font-awesome-icon
      :icon="['fas', 'plus-circle']"
      size="3x"
      class="text-yellow-500 fixed bottom-2 right-2"
      @click="openAddNoteModal"
    />
    <NotesModal
      :open-modal="showModal"
      @showmodal="updateShowModal"
      @savenote="addNote"
      :note="selectedNote"
      :edit="isNoteEdit"
      @editnote="editNote"
    />
    <DeleteModal
      :open-modal="showDeleteModal"
      @showdeletemodal="updateDeleteModal"
      @delete="deleteNote"
    />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
