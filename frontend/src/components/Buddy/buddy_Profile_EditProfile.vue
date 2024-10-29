<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { PhotoIcon, MapIcon, MapPinIcon, firstnameIcon, EnvelopeIcon, LinkIcon } from '@heroicons/vue/24/solid';
import prompt from '@/components/prompt_savechange.vue';
import { useRouter, useRoute } from 'vue-router';

import Toast from '@/components/toast.vue';  // Ensure correct case for the file name

const route = useRoute();
const router = useRouter();
const toastRef = ref(null);  // Create a ref for the Toast component
const isModalpromptOpen = ref(false);

const id = localStorage.getItem('c_id');
const username = ref('');
const about = ref('');
const selectedGender = ref('')
const firstname = ref('');
const lastname = ref('');
const url = ref('');

const fileInput = ref(null);
const selectedImage = ref(null);
let fileToUpload = null;

// Navigation function
function navigateTo(path) {
    router.push(path);
}

// Toggle modal visibility
function showPrompt() {
    isModalpromptOpen.value = true;
}

function handleSaveClick() { //click ni sa prompt
    console.log('Save button clicked!');
    // Perform actions when the Save button is clicked
}

function handleFileChange(event) {
    const file = event.target.files[0];
    fileToUpload = file;

    const reader = new FileReader();
    reader.onload = (event) => {
        selectedImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    selectedImage.value = null;
    fileToUpload = null;

    if (fileInput.value) {
        fileInput.value.value = '';
    }
}

function addLink() {
    console.log('Add link button clicked');
    links.value.push({ value: '' });
    console.log('Links array:', links.value);
}

function removeLink(index) {
    links.value.splice(index, 1);
}

// // Retrieve data from the backend based on localStorage c_id 
// async function get_Shelter_Details() {
//     try {
//         const response = await axios.post("http://localhost:5000/edit_shelterprofile", {
//             shelterid: id
//         });

//         console.log(response.data[0])
//         if (response.data) {
//             populateForm(response.data[0]);
//         }
//     }
//     catch (err) {
//         console.log("An error occurred getting shelter details", err);
//     }
// }

// // Populate the interface with the retrieved data 
// async function populateForm(data) {
//     username.value = data.shelter || '';
//     about.value = data.bio || '';
//     shelterAddress.value = data.address || '';
//     firstname.value = data.contact || '';
//     lastname.value = data.lastname || '';
//     lat.value = data.latitude || '';
//     lng.value = data.longitude || '';
//     url.value = data.profile || '';
//     // Handle links based on their format

//     console.log("lat lang to pass", lat.value, lng.value)

//     if (data.link) {
//         let parsedLinks = [];
//         try {
//             // Attempt to parse as JSON
//             parsedLinks = JSON.parse(data.link);
//             if (!Array.isArray(parsedLinks)) {
//                 throw new Error('Parsed links is not an array');
//             }
//         } catch (error) {
//             console.warn('Links are not in JSON format. Attempting to split by comma.');
//             // Fallback: split by comma
//             parsedLinks = data.link.split(',').map(link => link.trim()).filter(link => link);
//         }
//         links.value = parsedLinks.map(link => ({ value: link }));
//     } else {
//         links.value = [{ value: '' }];
//     }

//     // Handle profile image if available
//     if (data.profile) {
//         try {
//             const response = await axios.post("http://localhost:5000/image",
//                 {
//                     profileUrl: data.profile
//                 })
//             selectedImage.value = response.data.data
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
// }

// async function saveProfile() {
//     if (!fileToUpload) {
//         fileToUpload = url.value;
//     }

//     const transformedLinks = links.value.map(linkObj => linkObj.value);
//     const id = localStorage.getItem('c_id')

//     const formData = new FormData();
//     formData.append('image', fileToUpload);
//     formData.append('shelterid', id);
//     formData.append('links', JSON.stringify(transformedLinks)); // Serialize if backend expects JSON
//     formData.append('username', username.value);
//     formData.append('shelteraddress', shelterAddress.value);
//     formData.append('contact', firstname.value);
//     formData.append('lastname', lastname.value);
//     formData.append('latitude', lat.value);
//     formData.append('longitude', lng.value);
//     formData.append('bio', about.value);

//     // Log FormData entries for debugging
//     for (let pair of formData.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//     }

//     try {
//         const response = await axios.post("http://localhost:5000/save_shelterprofile",
//             formData,
//             {
//                 headers: { 'Content-Type': 'multipart/form-data' } // Correct header placement
//             }
//         );

//         if (response.data.success) {
//             navigateTo({
//                 path: "/myshelter",
//                 query: { showToast: true, message: 'Saved Successfully', status: 'success'}
//             });
//         } else {
//             if (route.query.showToast) {
//                 if (toastRef.value) {
//                     toastRef.value.showToast('error', response.data.message);
//                 }
//             }
//         }
//     }
//     catch (err) {
//         // Enhanced error handling
//         if (err.response) {
//             // Server responded with a status other than 2xx
//             console.error("Backend error:", err.response.data);
//             alert(`Error: ${err.response.data.message}`);
//         } else if (err.request) {
//             // Request was made but no response received
//             console.error("No response from server:", err.request);
//             alert('No response from server. Please try again later.');
//         } else {
//             // Something else caused the error
//             console.error("Error:", err.message);
//             alert(`Error: ${err.message}`);
//         }
//     }
// }
// onMounted(() => {
//     get_Shelter_Details();
// });
</script>


<template>
    <form>
        <div class="bg-white rounded-2xl p-10 sm:mx-0 md:mx-[2rem] lg:mx-[5rem] xl:mx-[10rem] my-[2.5rem]">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Buddy's Profile</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be
                    careful what you share.</p>
                <div class="mt-10 border-t pt-[2rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
                            Username</label>
                        <div class="mt-2">
                            <input type="text" v-model="username" name="username" id="username"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="profile-photo" class="block text-sm font-medium leading-6 text-gray-900">Profile
                            photo</label>
                        <div :class="{ 'py-5': !selectedImage, 'py-2': selectedImage }"
                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                            <div class="text-center" v-if="!selectedImage">
                                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label for="file-upload"
                                        class="relative cursor-pointer rounded-md font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" ref="fileInput" name="file-upload" type="file"
                                            class="sr-only" @change="handleFileChange" />
                                    </label>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            <div v-else class="flex justify-center items-center h-full w-full relative">
                                <img :src="selectedImage" class="max-w-[15rem] max-h-[15rem]" />
                                <button @click="clearImage"
                                    class="absolute top-2 sm:right-[1rem] lg:right-[8.1rem] text-gray-600 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-[1rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">
                            Firstname
                        </label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <input type="text" v-model="firstname" name="firstname" id="firstname"
                                autocomplete="firstname" placeholder="Contact Number"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-full md:col-span-3">
                        <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">
                            Lastname
                        </label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <input type="text" v-model="lastname" name="lastname" id="lastname" autocomplete="lastname"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>


                    <div class="sm:col-span-full md:col-span-3">
                        <label for="dob" class="block text-sm font-medium leading-6 text-gray-900">
                            Date of Birth
                        </label>
                        <div class="mt-2 flex gap-x-3 items-center">
                            <input v-model="dob" type="date" name="dob" id="dob"
                                class="border p-1 rounded-lg px-[1rem] w-full">
                        </div>
                    </div>

                    <div class="md:col-span-3 sm:col-span-full">
                        <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                        <div class="mt-2 w-full">
                            <select v-model="selectedGender" id="gender" name="gender"
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected disabled hidden>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">
                            Bio</label>
                        <div class="mt-2">
                            <textarea v-model="about" id="about" name="about" rows="3"
                                placeholder="Describe yourself, interest and dislike..."
                                class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <router-link to="/buddy_profile"
                    class="text-sm font-semibold leading-6 text-gray-900">Cancel</router-link>
                <!-- @click="showPrompt" //gitanggal nko ang prompt -->
                <button type="button" @click.prevent="saveProfile()"
                    class="rounded-md bgteal px-[2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-lightteal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                    Save Changes</button>
            </div>
            <!-- <prompt v-model:isOpen="isModalpromptOpen" @save-clicked="handleSaveClick" /> -->

            <!-- <Toast ref="toastRef" @closed="refreshRoute($router)" /> -->
            <!-- @closed="refreshRoute($router); navigateAfterToast() -->
        </div>
    </form>
</template>
