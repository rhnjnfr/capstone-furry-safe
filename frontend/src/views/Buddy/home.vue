<script setup>
import viewpostdetials from '@/components/Buddy/buddy_Home_ViewdetailsModal.vue';
import { ref } from 'vue';
import { ChatBubbleLeftIcon, IdentificationIcon } from "@heroicons/vue/24/outline";

const selectedPostId = ref(null);

const toggleModalViewDetails = (id) => {
    selectedPostId.value = selectedPostId.value === id ? null : id;
    console.log(id);
};

// newsfeed
const shelterpost = ref([
    {
        id: 1,
        username: 'Eric',
        profileImage: require('@/assets/images/homepage.png'),
        caption: 'You can’t buy love, but you can rescue it.',
        imageUrl: require('@/assets/images/homepage.png'),
    },
    {
        id: 2,
        username: 'bals',
        profileImage: require('@/assets/images/bals.png'),
        caption: 'You can’t buy love, but you can rescue it.',
        imageUrl: require('@/assets/images/bals.png'),
    },
    {
        id: 3,
        username: 'charles',
        profileImage: require('@/assets/images/charles.png'),
        caption: 'You can’t buy love, but you can rescue it.',
        imageUrl: require('@/assets/images/charles.png'),
    },
    {
        id: 4,
        username: 'eric',
        profileImage: require('@/assets/images/eric.png'),
        caption: 'You can’t buy love, but you can rescue it.',
        imageUrl: require('@/assets/images/eric.png'),
    },
]);
</script>

<template>
    <div v-for="post in shelterpost" :key="post.id" class="sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[50%] h-fit mb-4 mx-auto">
        <div class="px-[.5rem] py-[10px] flex gap-x-2 items-center">
            <div><img :src="post.profileImage" alt="profile"
                    class="w-10 h-10 flex border bg-white rounded-full object-cover" /></div>
            <span class="font-bold sm:text-sm xl:text-base">{{ post.username }}</span>
        </div>

        <div class="w-full h-fit rounded-xl bg-gray-900 flex items-center">
            <img class="mx-auto flex-shrink-0 w-[50rem] rounded-xl object-contain" :src="post.imageUrl"
                alt="image post" />
        </div>
        <div class="px-[.5rem] py-[.5rem] flex flex-col gap-y-2 items-start">
            <div class="flex gap-x-2">
                <div>
                    <button @click="toggleModalViewDetails(post.id)">
                        <IdentificationIcon class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700" />
                    </button>
                    <viewpostdetials v-if="selectedPostId === post.id" @close="toggleModalViewDetails(post.id)" />
                </div>
                <div>
                    <RouterLink to="/buddy_messages">
                        <ChatBubbleLeftIcon class="sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-700" />
                    </RouterLink>
                </div>
            </div>
            <div>
                <p class="sm:text-sm md:text-base font-medium text-gray-700 truncate">
                    <b class="pr-2">{{ post.username }}</b>
                    {{ post.caption }}
                </p>
            </div>
            <div class="w-full">
                <textarea class="border rounded-lg sm:text-sm md:text-base w-full p-2" name="commentsection"
                    placeholder="Add a comment..."></textarea>
            </div>
        </div>
    </div>
</template>
