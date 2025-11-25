<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Note Detail
              </DialogTitle>
              <div class="mt-2">
                <div>title</div>
                <input
                  v-model="title"
                  type="text"
                  class="border-w-2px border-gray-500 w-full outline-none p-1 rounded"
                />
              </div>
              <div class="mt-2">
                <div>points</div>
                <textarea
                  v-model="point"
                  class="border-w-2px border-gray-500 w-full outline-none p-1 rounded"
                ></textarea>
              </div>

              <div class="mt-4 flex flex-row-reverse">
                <button
                  type="button"
                  v-if="!edit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="saveNote"
                >
                  Save
                </button>
                <button
                  type="button"
                  v-else
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="editNote"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-dark-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 mr-2"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import type { newNote } from "../common.interface";
import type { Note } from "../common.interface";

const isOpen = ref(false);
const title = ref("");
const point = ref("");

interface Props {
  openModal?: boolean;
  note: Note;
  edit: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  openModal: false,
  edit: false,
});

const emit = defineEmits<{
  (e: "showmodal", id: boolean): void;
  (e: "savenote", value: newNote): void;
  (e: "editnote", value: Note): void;
}>();

watch(props, () => {
  isOpen.value = props.openModal;
  title.value = props.note.title;
  point.value = props.note.point;
});

function closeModal() {
  emit("showmodal", false);
  isOpen.value = false;
}

const saveNote = () => {
  emit("showmodal", false);
  let newnote = {
    title: title.value,
    point: point.value,
  };
  title.value = "";
  point.value = "";
  emit("savenote", newnote);
};

const editNote = () => {
  emit("showmodal", false);
  let updatenote = {
    id: props.note.id,
    title: title.value,
    point: point.value,
  };
  emit("editnote", updatenote);
};
</script>
