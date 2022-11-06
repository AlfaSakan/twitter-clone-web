<script setup lang="ts">
import { ref } from "vue";
import TextAtom from "./TextAtom.vue";

export interface Props {
  placeholder: string;
  type: string;
  error?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  error: "",
});

const input = ref("");
const onFocus = ref(false);

//#region HANDLE
const handleFocus = () => {
  if (input.value) return;

  onFocus.value = true;
};

const handleBlur = () => {
  if (input.value) return;

  onFocus.value = false;
};
//#endregion
</script>

<template>
  <div class="flex-col">
    <TextAtom
      :class="
        (input || onFocus ? 'opacity-100' : 'opacity-0') +
        ' transition-all duration-300'
      "
      :text="placeholder"
    />
    <input
      :class="
        'px-3 py-2 rounded w-full focus:outline-none border bg-slate-100 ' +
        (error ? 'border-red-500' : 'border-slate-500')
      "
      :type="type"
      :placeholder="onFocus ? '' : placeholder"
      maxlength="250"
      v-model="input"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement)?.value
        )
      "
      required
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <TextAtom
      :class="(error ? 'opacity-100' : 'opacity-0') + ' transition-opacity'"
      :text="error"
      size="sm"
      :is-error="true"
    />
  </div>
</template>
