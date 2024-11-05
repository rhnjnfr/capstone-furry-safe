<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios"
import { Square2StackIcon } from '@heroicons/vue/20/solid'
import popupNewpost from '@/components/Shelter/shelter_NewPostModal.vue'
const showModalCreatePost = ref(false)
import viewpostdetials from '@/components/Shelter/shelter_Myshelter_GridPostViewdetailsModal.vue';
const postImages = [
    {
        id: 1,
        imageUrl: [require('@/assets/images/eric.png'), require('@/assets/images/eric.png'), require('@/assets/images/eric.png')]
    },
];

// view detials on grid images
const selectedPostViewDetailsId = ref(null);
const toggleModalViewDetails = (id) => {
    selectedPostViewDetailsId.value = selectedPostViewDetailsId.value === id ? null : id;
    console.log(id);
};

//function
let _user_id = localStorage.getItem('u_id')
let posts = ref([])
async function retrieveReports() {
    try {
        const response = await axios.post("http://localhost:5000/getereports", {
            _user_id
        });

        if (response.data && response.data.length > 0) {
            posts.value = response.data
        }
        console.log("post value", posts.value)
    }
    catch (err) {
        console.log("error in retrieve reports", err)
    }
}

onMounted(async () => {
    await retrieveReports()
})

</script>
<template>
    <div v-if="posts && posts.length > 0" class="xl:container mx-auto my-2">
        <ul role="list" class="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-4">
            <li v-for="post in posts" :key="post.post_id" class="relative">
                <button @click="toggleModalViewDetails(post.post_id)"
                    class="group block w-full overflow-hidden bg-white">
                    <!-- Display the image (single or first in array) -->
                    <img :src="Array.isArray(post.photos) ? post.photos[0] : post.photos" alt="Post image"
                        class="pointer-events-none aspect-square object-cover group-hover:opacity-75" />

                    <!-- Display the overlay icon if there are multiple images -->
                    <Square2StackIcon v-if="Array.isArray(post.profile) && post.profile.length > 1"
                        class="absolute top-2 right-2 h-5 w-5 text-white group-hover:opacity-75" />
                </button>
                <viewpostdetials v-if="selectedPostViewDetailsId === post.post_id"
                    @close="toggleModalViewDetails(post.post_id)" />
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