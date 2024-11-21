<template>
    <div class="font-semibold border-t text-sm rounded-b-lg">
        <!-- <button v-if="!showRescueCancelButtons && !showSuccessMessage && !showConfirmDialog" type="button"
            class="flex justify-center py-4 font-semibold w-full text-red-600 bg-slate-50 hover:bg-red-500 hover:text-white rounded-b-lg"
            @click="showRescueCancelButtons = true;"> -->
        <button
            class="flex justify-center py-4 font-semibold w-full text-red-600 bg-slate-50 hover:bg-green-500 hover:text-white rounded-b-lg"
            @click="clicked = true; getMessageRoute()">
            <!-- <RouterLink :to="getMessageRoute"> -->
            <span class="font-bold text-sm">Message</span>
            <!-- </RouterLink> -->
        </button>

        <!-- </button>

        <div v-else-if="showRescueCancelButtons || props.operation == 'ongoing'"
            class="flex justify-between font-semibold text-gray-600 rounded-b-lg">
            <button type="button" class="bg-green-100 py-4 w-full hover:bg-green-500 hover:text-white rounded-bl-lg"
                @click="handleAction('Rescued')">
                Rescued
            </button>
        </div> -->

    </div>

</template>

<script setup>
import { onMounted, ref, computed, } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
const props = defineProps({
    postId: {
        type: Number,
        required: true
    },
    operation: {
        type: String,
        required: false
    },
    reportDetails: {
        type: Object,
        required: false
    }
});


const router = useRouter();
function navigateTo(path) {
    router.push(path);
}

const emit = defineEmits(['statusUpdated']);

const selectedreportDetails = ref(null);
const reportDetails = ref(null);
onMounted(async () => {
    reportDetails.value = props.reportDetails;
    console.log('Props ssssssss', props.reportDetails);
});

// Assuming reportDetails is an array of posts:
function selectedPost() {
    console.log("selecting post..", reportDetails.value)
    return selectedreportDetails.value ? reportDetails.value.find(post => post.post_id === props.postId) : null;
}

// // OR if reportDetails is an object:
// const selectedPost = computed(() => {
//     return reportDetails.value ? reportDetails.value[props.postId] : null;
// });

// Computed route based on user type
let clicked = false
const userType = localStorage.getItem('u_type');
async function getMessageRoute() {
    console.log("heloo", props.postId)

    if (clicked) {
        // await selectedPost()
        console.log("heloo", reportDetails.value)
        if (userType === 'shelter') {
            console.log('Going to Shelter', props.postId, props.reportDetails.user_id);
            // return { name: 'sheltermessages', query: { shelterId: props.postId, shelterUserID: props.reportDetails.user_id } };

            navigateTo({
                name: "sheltermessages",
                query: { shelterId: props.postId, shelterUserID: props.reportDetails.user_id }
            });
        } else {
            console.log('Going to Buddy', props.postId, props.reportDetails.user_id);
            // return { name: 'buddy_messages', query: { buddyId: props.reportDetails.user_id } };
            navigateTo({
                name: 'buddy_messages',
                query: { buddyId: props.reportDetails.user_id }
            });
        }
    }
}



// navigateTo({
//     path: "/buddy_profile",
//     query: { showToast: true, message: 'Saved Successfully', status: 'success' }
// });

</script>