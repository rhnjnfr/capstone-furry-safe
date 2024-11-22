<script setup>
import { PencilIcon } from '@heroicons/vue/20/solid'
import linkfooter from '@/components/footerLink.vue'
import axios from "axios";
import { ref, watch, computed, onMounted, toRaw, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toast from '@/components/toast.vue';  // Ensure correct case for the file name

//jo tabang 
const downloadicon = 'https://img.icons8.com/?size=100&id=sXUnPq4XYR1D&format=png&color=000000'

const toastRef = ref(null);  // Create a ref for the Toast component

const route = useRoute();
const petid = route.params.petid;
const id = localStorage.getItem('u_id')

const petprofile = ref('')
let extraphotos = ref([])

const healthAndMedical = reactive([])
const info = ref([])

const petDetails = ref({})

async function loadPetProfiles() {
    try {
        const response = await axios.post("http://localhost:5000/profile", {
            _petid: petid
        });

        if (response.data && response.data.length > 0) {
            response.data.forEach(profile => {
                const _name_nickname = profile.name_nickname;
                const [name, nickname] = _name_nickname.split('/');

                if (profile.additionalphotos && profile.additionalphotos != "No additional photos") {
                    extraphotos = profile.additionalphotos.split(',').map(url => ({
                        source: url.trim()
                    }));
                }

                console.log("profile", profile)
                petDetails.value = {
                    petid: profile.id,
                    name: name,
                    nickname: nickname,
                    petBreed: profile.breed,
                    petCategory: profile.pet_category, // Corrected typo from 'petCatergory'
                    coat: profile.coat,
                    date_rehomed: profile.date_rehomed,
                    size: profile.size,
                    energyLevel: profile.energylevel || "Unspecified", // Corrected to camelCase
                    age: profile.age,
                    gender: profile.gender,
                    about: profile.about,
                    status: profile.status,
                    owner: profile.owner,
                    owner_id: profile.owner_id,
                    owner_type: profile.owner_type,
                    owner_typeid: profile.owner_typeid,
                    qrphoto: profile.qr,
                    extraphotos: extraphotos, // Use transformed extraphotos array
                    imageUrl: profile.profileurl,
                    contact: profile.contact
                };

                healthAndMedical.length = 0;
                healthAndMedical.push(
                    {
                        label: 'Vaccinations Status',
                        details: profile.vaccinename || "Not vaccinated"
                    },
                    {
                        label: 'Spay / Neuter',
                        status: profile.sterilization || "Unknown"
                    },
                    {
                        label: 'Medical Conditions',
                        status: profile.condition || "None known"
                    },
                    {
                        label: 'Special Needs',
                        status: profile.need || "None"
                    }
                );

                petprofile.value = profile.profileurl;
            });
        }
    } catch (err) {
        if (toastRef.value) {
            toastRef.value.showToast(err);
        }
    }
}
// original qr code
let qrgenerated = ref(false)
let qrphotosrc = ref(null)
// function generateQR() {
//     let qrvalue = window.location.href;
//     qrphotosrc.value = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrvalue;
//     qrgenerated.value = true

//     console.log("qr generated", qrgenerated.value)
// }

// test line


function generateQR(petid) {
    let qrvalue = `${window.location.origin}/frrysf_view/scanview_animalprofileform/${petid}`;
    qrphotosrc.value = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrvalue);
    qrgenerated.value = true;

    console.log("QR Generated:", qrphotosrc.value);
}

// Access the router instance
const router = useRouter();

// Test navigation function to simulate QR scan navigation
function testNavigation() {
    const tpetid = petid; // Use the same petid you used to generate the QR code
    const path = `/frrysf_view/scanview_animalprofileform/${tpetid}`;
    console.log(`Navigating to path: ${path}`);

    // Use the router to programmatically navigate to the generated path
    router.push(path).then(() => {
        console.log('Navigation successful!');
    }).catch(error => {
        console.log('Navigation failed:', error);
    });
}
// end of test line



async function downloadQR() {
    try {
        const response = await fetch(qrphotosrc.value);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';  // Set a name for the downloaded file
        link.click();
        URL.revokeObjectURL(link.href);  // Clean up after download
    } catch (err) {
        console.error("Failed to download the QR code", err);
    }
}

const userType = localStorage.getItem('u_type')
let access_token = ref(false);
onMounted(async () => {

    generateQR(petid)
    await loadPetProfiles()


    console.log("petDetails", petDetails.value)
    access_token.value = localStorage.getItem('access_token')
    console.log(access_token.value)
    if (route.query.showToast && route.query.from == 'edit') {
        console.log("D:", route.query)
        const message = route.query.message || 'Pet Profile Saved Successfully';
        if (toastRef.value) {
            toastRef.value.showToast(message);
        }
    }
})
</script>

<template>
    <div>
        <div id="marginright" class="pb-[2rem] lg:mx-[3rem] flex justify-between items-center">
            <div>
                <RouterLink v-if="access_token != null" to="/animalprofile" class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-[14px] hover:font-medium">Back</span>
                </RouterLink>
            </div>
        </div>
        <div class="sm:mx-[1rem] md:mx-[10rem]">
            <div class="border-b mb-6">
                <div class=" flex justify-between px-4 sm:px-0">
                    <h3 class="text-base font-semibold leading-7 text-gray-900">Pet Information</h3>
                </div>
                <div class="pb-[1rem]">
                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">This Information related to this Furry
                        Animal will be displayed publicly.</p>
                </div>
            </div>
            <div class="flex mt-[1rem] place-content-center space-x-10">
                <div class="w-[13rem] border rounded-lg p-[1rem]">
                    <img :src="petDetails.imageUrl" alt="Pet Profile">
                </div>
                <div class="grid grid-flow-col items-center space-x-8">
                    <div class="relative group ">
                        <div v-if="qrgenerated" class="w-[13rem] border rounded-lg p-[2rem]">
                            <img id="qrcode" :src="qrphotosrc" alt="Pet QR Code">
                        </div>
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                            <button @click="downloadQR" class="bg-blue-500 text-white px-4 py-1 rounded">
                                Download
                            </button>
                        </div>
                    </div>
                    <!-- <button @click="testNavigation" class="bg-green-500">Test</button> -->
                    <RouterLink :to="{ name: 'editanimalprofile', params: { petid: petDetails.petid } }">
                        <button id="switch2" type="button"
                            class="inline-flex justify-center rounded-md bg-white sm:px-[2rem] md:px-[2rem] lg:px-[2.5rem] py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span class="sm:text-[13.5px] md:text-[14px]">Edit Profile</span>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="mt-6">
                <dl class="grid grid-cols-1 sm:grid-cols-2">
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Given-Name</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.name }} / {{
                            petDetails.nickname }}
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Date Re-homed</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.date_rehomed }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Owner</dt>
                        <RouterLink v-if="userType == 'buddy'" :to="petDetails.owner_type === 'shelter'
                            ? { name: 'pov_viewshelterprofile_buddy', query: { shelterId: petDetails.owner_typeid, shelterUserID: petDetails.owner_id } }
                            : { name: 'pov_viewbuddyprofile_buddy', query: { buddyId: petDetails.owner_id } }">
                            <span class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {{ petDetails.owner }}
                            </span>
                        </RouterLink>
                        <RouterLink v-else :to="petDetails.owner_type === 'shelter'
                            ? { name: 'pov_viewshelterprofile_shelter', query: { shelterId: petDetails.owner_typeid, shelterUserID: petDetails.owner_id } }
                            : { name: 'pov_viewbuddyprofile_shelter', query: { buddyId: petDetails.owner_id } }">
                            <span class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {{ petDetails.owner }}
                            </span>
                        </RouterLink>
                        <span v-if="petDetails.contact != null" class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"> /
                            {{ petDetails.contact }}
                        </span>
                        <span v-else class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"> 
                            / No Contact Available
                        </span>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Pet Status</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.status }}
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Pet Type</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.petCategory }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Age / Gender</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                            <span>
                                <!--  {{ petDetails.age }} / {{ petDetails.gender }}-->
                                <span v-if="petDetails.age < 1" class="italic"> Age to be confirmed </span>
                                <span v-else-if="petDetails.age == 1" class="italic"> {{ petDetails.age }} year old </span>
                                <span v-else="petDetails.age > 1" class="italic"> {{ petDetails.age }} years old </span>
                                /
                                <span v-if="petDetails.gender == 'm'">Male</span>
                                <span v-else="petDetails.gender == 'f'">Female</span>
                            </span>
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Breed / Mix</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.petBreed }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Size</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.size }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 mr-[2rem]">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Coat / Fur</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.coat }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Energy Level</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.energyLevel }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">About</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ petDetails.about }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <span class="text-sm font-semibold leading-6 text-gray-900">Health and Medical</span>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            v-for="(item, index) in healthAndMedical" :key="index">
                            <dt class="text-sm font-normal  leading-6 text-gray-900 mr-[2rem]">{{ item.label }}</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ item.status }} {{
                                item.details ? `${item.details}` : '' }}</dd>
                        </div>
                    </div>
                    <div class="border-t border-gray-100 px-4 pt-6 sm:col-span-2 sm:px-0">
                        <span class="text-sm font-medium leading-6 text-gray-900">Photos</span>
                    </div>
                    <div class="px-4 py-6 sm:col-span-2 sm:px-0">
                        <ul role="list"
                            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            <li v-for="image in extraphotos" :key="image.source" class="relative">
                                <div
                                    class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                    <img :src="image.source" alt=""
                                        class="pointer-events-none w-80 h-80 object-cover " />
                                </div>
                            </li>
                        </ul>
                    </div>
                </dl>
            </div>
        </div>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
        <Toast ref="toastRef" @closed="refreshRoute($router)" />
    </div>
</template>
