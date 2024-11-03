<script setup>
import { ref } from 'vue';
import { Square2StackIcon } from '@heroicons/vue/20/solid'

const postImages = [
    // {
    //     id: 1,
    //     imageUrl: [require('@/assets/images/eric.png'), require('@/assets/images/eric.png'), require('@/assets/images/eric.png')]
    // },
    // {
    //     id: 2,
    //     imageUrl: require('@/assets/images/charles.png')
    // },
    // {
    //     id: 3,
    //     imageUrl: [require('@/assets/images/bals.png'), require('@/assets/images/eric.png'), require('@/assets/images/eric.png')]
    // },
    // {
    //     id: 4,
    //     imageUrl: [require('@/assets/images/bert.png'), require('@/assets/images/eric.png'), require('@/assets/images/eric.png')]
    // },
    // {
    //     id: 5,
    //     imageUrl: [require('@/assets/images/homepage.png'), require('@/assets/images/eric.png'), require('@/assets/images/eric.png')]
    // },
];


import viewpostdetials from '@/components/Shelter/shelter_Myshelter_GridPostViewdetailsModal.vue';

// view detials on grid images
const selectedPostViewDetailsId = ref(null);
const toggleModalViewDetails = (id) => {
    selectedPostViewDetailsId.value = selectedPostViewDetailsId.value === id ? null : id;
    console.log(id);
};
import popupNewpost from '@/components/Shelter/shelter_NewPostModal.vue'
const showModalCreatePost = ref(false)

</script>
<template>
    <div v-if="postImages && postImages.length > 0" class="xl:container mx-auto my-2">
        <ul role="list" class="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-4">
            <li v-for="post in postImages" :key="post.id" class="relative">
                <button @click="toggleModalViewDetails(post.id)" class="group block w-full overflow-hidden bg-white">
                    <!-- Display the first image in the array or the single image if it's not an array -->
                    <img :src="Array.isArray(post.imageUrl) ? post.imageUrl[0] : post.imageUrl" alt=""
                        class="pointer-events-none aspect-square object-cover group-hover:opacity-75" />

                    <!-- Display the overlay icon if there are multiple images -->
                    <Square2StackIcon v-if="Array.isArray(post.imageUrl) && post.imageUrl.length > 1"
                        class="absolute top-2 right-2 h-5 w-5 text-white group-hover:opacity-75" />
                </button>
                <viewpostdetials v-if="selectedPostViewDetailsId === post.id"
                    @close="toggleModalViewDetails(post.id)" />
            </li>
        </ul>
    </div>
    <div v-else class="flex flex-col place-items-center text-gray-500 mx-8 gap-y-1 sm:my-[5rem] lg:my-[8.5rem]">
        <img width="100" height="100"
            src="https://img.icons8.com/external-outline-geotatah/100/737373/external-pet-pet-lover-society-outline-geotatah-5.png"
            alt="external-pet-pet-lover-society-outline-geotatah-5" />
        <h1 class="sm:text-xl lg:text-2xl font-extrabold">Your Shelter Posts</h1>
        <p class="text-sm font-medium flex text-center">When you create a post related to the shelter, they'll appear
            here.</p>
        <button @click="showModalCreatePost = true" type="button"
            class="underline underline-offset-4 hover:text-amber-600">Create your first Post</button>
        <popupNewpost v-if="showModalCreatePost" @close="showModalCreatePost = false" />
    </div>
</template>