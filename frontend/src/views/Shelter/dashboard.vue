<!-- <script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/Shelter/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'
import updatescard from '@/components/Shelter/shelter_Dashboard_Activities.vue';
import displaymap from '@/components/Map2.vue';
import mapoverlay from '@/components/pin_MapModal.vue'
import statsCard from '@/components/Shelter/shelter_Dashboard_statsCard.vue';
import shelterfeed from '@/components/Shelter/shelter_Myshelter_NewsfeedCard.vue'; // joey added

export default {
    beforeMount() {
        // this.address_exists = localStorage.getItem("address_exists")
        const address_exist = localStorage.getItem('address_exists')

        if (address_exist.startsWith(false)) {
            this.toggleModal()
        }

        this.open = true; // Set the open ref value to true
    },
    components: {
        textvalue, datetoday, linkfooter, updatescard, displaymap, mapoverlay, statsCard, shelterfeed
    },
    data() {
        return {
            modalVisible: false,
        }
    },
    methods: {
        toggleModal() {
            console.log("Toggling modal");
            this.modalVisible = true; // Show the modal
        },
    },
};
</script> -->
<script setup>
import { ref, onBeforeMount } from 'vue'
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/Shelter/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'
// import updatescard from '@/components/Shelter/shelter_Dashboard_Activities.vue'
// import displaymap from '@/components/Map2.vue'
import mapoverlay from '@/components/pin_MapModal.vue'
import shelterfeed from '@/components/Shelter/shelter_Myshelter_NewsfeedCard.vue' // joey added
import { ChartBarIcon } from "@heroicons/vue/24/solid"
import ShelterOverview from '@/components/Shelter/shelter_Dashboard_Stats.vue'

// Define refs
const modalVisible = ref(false)
const openOverview = ref(false)

// Handle before mount logic
onBeforeMount(() => {
    const address_exist = localStorage.getItem('address_exists')

    if (address_exist.startsWith(false)) {
        toggleModal()
    }
})

// Methods
const toggleModal = () => {
    console.log("Toggling modal")
    modalVisible.value = true // Show the modal
}

const toggleOverview = () => {
    openOverview.value = !openOverview.value;
}
</script>
<template>
    <div class="h-screen flex flex-col my-8 mx-8">
        <mapoverlay v-if="modalVisible" @close="modalVisible = false" />
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Dashboard" />
            </div>
            <div class="flex gap-x-2">
                <button type="button" @click="toggleOverview"
                    class="bgorange hover:bg-lightorange text-sm flex items-center text-white px-4 gap-x-1 rounded-lg font-semibold">
                    <ChartBarIcon class="h-4 w-4 text-white" />Overview
                </button>
                <ShelterOverview v-if="openOverview" @close="openOverview = false" />
                <datetoday />
            </div>
        </header>
        <main class="mt-[1rem] flex gap-x-6 sm:flex-col sm:gap-y-6 xl:flex-row">
            <div class="xl:container mx-auto">
                <shelterfeed />
            </div>
        </main>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>