<template>
  <div class="flex h-screen">
    <main class="flex-1">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex sm:flex-col md:flex-row justify-between gap-y-4 items-center mb-6 px-8">
          <div class="flex sm:flex-col md:flex-row items-center gap-y-3 space-x-8">
            <img :src="user.user_profile_url || default_avatar" alt=""
              class="rounded-full border-2 w-32 h-32 object-cover" />
            <div>
              <h2 class="text-2xl font-bold">{{ user.full_name }}</h2>
              <div class="flex sm:justify-center md:justify-start items-center gap-x-2 text-gray-600 text-sm">
                <UserIcon class="h-4 w-4 text-gray-500" />
                <span class="font-medium">{{ user.gender }}</span>
              </div>
            </div>
          </div>
          <RouterLink to="/buddy_editprofile"
            class="px-8 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-x-2 text-sm">
            <PencilIcon class="h-4 w-4" />
            Edit Profile
          </RouterLink>
        </div>

        <p class="text-gray-600 mb-4 mx-8">
          {{ user.bio }}
        </p>


        <div class="border-b mb-6 sm:mx-0 md:mx-8 text-sm">
          <div class="flex space-x-4 text-lg">
            <button @click="selectTab('feed')" class="px-4 py-2"
              :class="{ 'text-gray-900 border-b-2 border-gray-900': selectedTab === 'feed' }">Feed</button>
            <button @click="selectTab('dog')" class="px-4 py-2"
              :class="{ 'text-gray-900 border-b-2 border-gray-900': selectedTab === 'dog' }">Pet Profile</button>
            <button @click="selectTab('skills')" class="px-4 py-2"
              :class="{ 'text-gray-900 border-b-2 border-gray-900': selectedTab === 'skills' }">Badge</button>
          </div>
        </div>

        <div v-if="selectedTab === 'feed'" class="sm:mx-0 md:mx-8">
          <!-- grid images of buddy post -->
          <div>
            <ul role="list" class="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-4">
              <li v-for="post in feedImages" :key="post.id" class="relative">
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
        </div>

        <div v-if="selectedTab === 'dog'" class="sm:mx-0 md:mx-8">
          <h2 class="text-2xl font-bold mb-4">Dog Profiles</h2>
          <div class="grid grid-cols-3 mt-10 gap-5">
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg border bg-zinc-100 p-3">
                <img :src="require('/src/assets/images/bals.png')" alt="placeholder"
                  class="h-full w-full rounded-lg object-cover" />
                <div class="pt-5 space-y-5">
                  <h3 class="font-semibold">Rhona; Golden Retriever</h3>
                  <button class="w-full py-5 bg-gray-900 text-white rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'skills'" class="sm:mx-0 md:mx-8">
          <!-- Content for Skills -->
        </div>
        <div v-if="selectedTab === 'achievements'">
          <!-- Content for Achievements -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PencilIcon, UserIcon, Square2StackIcon } from "@heroicons/vue/20/solid";
import axios from 'axios';

import viewpostdetials from '@/components/Buddy/buddy_Profile_GridViewdetailsModal.vue';
// view detials on grid images
const selectedPostViewDetailsId = ref(null);
const toggleModalViewDetails = (id) => {
  selectedPostViewDetailsId.value = selectedPostViewDetailsId.value === id ? null : id;
  console.log(id);
};

const selectedTab = ref('feed'); // Default selected tab

const selectTab = (tab) => {
  selectedTab.value = tab; // Update the selected tab
};

import default_avatar from '@/assets/images/buddy_default.jpg'
const user = ref({})
async function getUserDetails() {
  try {
    const _id = localStorage.getItem('u_id')
    const response = await axios.post("http://localhost:5000/getbuddydetails",
      {
        _id: _id
      }
    )
    if (response.data.success) {
      console.log(response.data.data)
      user.value = response.data.data[0]
      console.log("user avatar", user.value) // Check to confirm values are set
    }
  }
  catch (err) {
    console.log("error", err)
  }
}

onMounted(() => { //pag load sa page mag load ni =)
  console.log("D:")
  getUserDetails()
})

const feedImages = ref([
  {
    id: 1,
    imageUrl: [
      require('@/assets/images/eric.png'),
      require('@/assets/images/eric.png'),
      require('@/assets/images/eric.png')
    ]
  },
  {
    id: 2,
    imageUrl: require('@/assets/images/charles.png')
  },
  {
    id: 3,
    imageUrl: [
      require('@/assets/images/bals.png'),
      require('@/assets/images/eric.png'),
      require('@/assets/images/eric.png')
    ]
  }
]);
</script>