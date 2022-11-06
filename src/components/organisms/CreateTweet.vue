<script setup lang="ts">
import ButtonSmall from "../atoms/ButtonSmall.vue";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import TextInput from "../atoms/TextInput.vue";
import IconMessage from "../icons/IconMessage.vue";

export interface Props {
  name: string;
}

withDefaults(defineProps<Props>(), {
  name: "",
});
</script>

<template>
  <div class="p-4 border-b gap-2 items-start">
    <div>
      <PictureRoundLarge :text="name" />
    </div>
    <div class="items-start w-full flex-col">
      <TextInput
        placeholder="What's happening?"
        class="text-lg placeholder:text-slate-500 font-medium h-auto"
      />
      <div class="pt-4 gap-4 w-full border-t">
        <IconMessage class="w-6 fill-blue-400" />
        <IconMessage class="w-6 fill-blue-400" />
        <IconMessage class="w-6 fill-blue-400" />
        <IconMessage class="w-6 fill-blue-400" />
        <IconMessage class="w-6 fill-blue-400" />
        <ButtonSmall class="ml-auto" :text="'Tweet'" />
      </div>
    </div>
  </div>
</template>
