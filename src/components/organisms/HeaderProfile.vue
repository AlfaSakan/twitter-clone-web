<script setup lang="ts">
import type { User } from "@/models/userModel";
import { useUserStore } from "@/stores/userStore";
import { convertTimeToMonthYear } from "@/utils/convertDate";
import { storeToRefs } from "pinia";
import ButtonSmallOutline from "../atoms/ButtonSmallOutline.vue";
import PictureRoundExtraLarge from "../atoms/PictureRoundExtraLarge.vue";
import TextIcon from "../atoms/TextIcon.vue";
import IconCalendar from "../icons/IconCalendar.vue";

export interface Props {
  user: User;
}

defineProps<Props>();

const { userId } = storeToRefs(useUserStore());
</script>

<template>
  <div class="flex-col relative mb-3 lg:pt-15">
    <div class="bg-slate-300 h-48" />
    <div class="bg-white h-48 px-3">
      <div class="flex-col mt-18">
        <p class="text-xl font-bold">{{ user.name }}</p>
        <p class="text-slate-500 text-sm">@{{ user.username }}</p>
        <TextIcon
          :text="`Joined ${convertTimeToMonthYear(user.created_at || 0)}`"
          class="mt-3"
        >
          <template #icon>
            <IconCalendar class="w-5 fill-slate-500" />
          </template>
        </TextIcon>
        <div class="gap-4 text-slate-500 text-sm mt-3">
          <p><span class="font-bold text-black">100</span> Following</p>
          <p><span class="font-bold text-black">100</span> Followers</p>
        </div>
      </div>
      <ButtonSmallOutline
        v-if="user.id === userId"
        text="Edit Profile"
        class="border-slate-400 text-black h-10 ml-auto mt-3"
      />
      <!-- <ButtonSmallOutline
        v-else
        text="Following"
        class="border-slate-400 text-black h-10 ml-auto mt-3"
      /> -->
    </div>
    <PictureRoundExtraLarge
      :text="user.name"
      class="bg-black text-white border-4 border-white absolute top-32 lg:top-48 left-3"
    />
  </div>
</template>
