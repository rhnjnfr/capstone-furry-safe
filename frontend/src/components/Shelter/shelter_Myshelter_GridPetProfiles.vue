<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios"
import { Square2StackIcon } from '@heroicons/vue/20/solid'

import popupNewpost from '@/components/Shelter/shelter_NewPostModal.vue'
const showModalCreatePost = ref(false)
import viewpostdetials from '@/components/Shelter/shelter_Myshelter_GridPostViewdetailsModal.vue';

// view detials on grid post images
const selectedProfileViewDetails = ref(null);
const selectedProfileViewDetailsId = ref(null);
const toggleModalProfileViewDetails = (id) => {
    if (selectedProfileViewDetailsId.value === id) {
        selectedProfileViewDetailsId.value = null;
        selectedProfileViewDetails.value = null;
        console.log("Profile modal closed");
    } else {
        selectedProfileViewDetailsId.value = id;
        selectedProfileViewDetails.value = petprofiles.value.find(pet => pet.id === id) || null;
        console.log("selectedProfileViewDetails", selectedProfileViewDetails.value);
    }
};

//function
// let _user_id = localStorage.getItem('u_id')
// let posts = ref([])
// async function retrieveReports() {
//     try {
//         const response = await axios.post("http://localhost:5000/getereports", {
//             _user_id: _user_id
//         });

//         if (response.data && response.data.length > 0) {
//             posts.value = response.data
//         }
//         console.log("post value", posts.value)
//     }
//     catch (err) {
//         console.log("error in retrieve reports", err)
//     }
// }
const userId = localStorage.getItem('u_id')
import viewprofiledetials from '@/components/Buddy/buddy_Profile_GridProfileViewdetailsModal.vue'; // for view profile details
const petprofiles = ref([]);
const petid = null;
async function loadPetProfiles() {
    try {
        console.log("load pet details =)")
        const response = await axios.post("http://localhost:5000/profile", {
            _userid: userId,
            _petid: petid
        });

        if (response.data && response.data.length > 0) {
            // response.data.forEach(profile => {
            //     const _name_nickname = profile.name_nickname;
            //     const [name] = _name_nickname.split('/');
            //     petprofiles.value.push({
            //         petid: profile.id,
            //         name: name,
            //         petType: profile.breed,
            //         imageUrl: profile.profileurl || ''  // Ensure this is an empty string if no URL
            //     });
            // });
            petprofiles.value = response.data
        }
        console.log(response.data, "load pet details =)")
    }
    catch (err) {
        console.log("Error loading profiles: ", err);
    }
}

function hasMultiplePhotos(photo_display_url) {
    try {

        // // Double parse to handle stringified JSON
        // const photos = JSON.parse(JSON.parse(`"${photo_display_url}"`));
        // return Array.isArray(photos) && photos.length > 1;
        return Array.isArray(photo_display_url) && photo_display_url.length > 1
    } catch (e) {
        console.error("Error parsing photos:", e);
        return false;
    }
}

onMounted(async () => {
    await loadPetProfiles()

})
</script>
<template>
    <div v-if="petprofiles && petprofiles.length > 0" class="xl:container mx-auto my-2">
        <ul role="list" class="grid grid-cols-3 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-4">
            <li v-for="profile in petprofiles" :key="profile.petid" class="relative">
                <button @click="toggleModalProfileViewDetails(profile.id)"
                    class="group block w-full overflow-hidden bg-white">
                    <!-- Display the first image in the array or the single image if it's not an array -->
                    <img :src="Array.isArray(profile.profileurl) ? profile.profileurl[0] : profile.profileurl" alt="img"
                        class="pointer-events-none aspect-square object-cover group-hover:opacity-75" />

                    <!-- Display the overlay icon if there are multiple images -->
                    <Square2StackIcon v-if="((profile.additionalphotos != 'No additional photos') || (profile.post_photos != 'No post photos'))
                        && profile.profileurl > 1"
                        class="absolute top-2 right-2 h-5 w-5 text-white group-hover:opacity-75" />
                </button>
                <viewprofiledetials v-if="selectedProfileViewDetailsId === profile.id"
                    :selectedProfileDetails="selectedProfileViewDetails"
                    @close="toggleModalProfileViewDetails(profile.id)" />
                <!--  :mode="pov" -->
            </li>
        </ul>
    </div>
    <div v-else class="flex flex-col place-items-center text-gray-500 mx-8 gap-y-1 sm:my-[5rem] lg:my-[8.5rem]">
        <img width="100" height="100"
            src="https://img.icons8.com/external-becris-lineal-becris/100/737373/external-pet-hotel-service-becris-lineal-becris.png"
            alt="external-pet-hotel-service-becris-lineal-becris" />
        <h1 class="sm:text-xl lg:text-2xl font-extrabold">Your Pet Profiles</h1>
        <p class="text-sm font-medium flex text-center">
            When you create a Pet Profile it'll appear
            here.</p>
    </div>
</template>