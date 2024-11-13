<template>
    <div class="font-semibold border-t text-sm rounded-b-lg">
        <!-- Nov5 change v-if="!showRescueCancelButtons && !showSuccessMessage && !showConfirmRescue && !showConfirmCancel" to -->
        <!-- <button v-if="!showRescueCancelButtons && !showSuccessMessage && !showConfirmDialog" type="button"
            class="flex justify-center py-4 font-semibold w-full text-red-600 bg-slate-50 hover:bg-red-500 hover:text-white rounded-b-lg"
            @click="showRescueCancelButtons = true; confirmAction()">
            Take Action v-else-if="showRescueCancelButtons || props.operation == 'ongoing'" 
        </button> -->

        <div class="flex justify-between font-semibold text-gray-600 rounded-b-lg">
            <button type="button" class="bg-green-100 py-4 w-full hover:bg-green-500 hover:text-white rounded-bl-lg"
                @click="handleAction('Rescued')"> <!-- Nov5 -->
                Confirm Rescue
            </button>
            <RescueFillupFormModal v-if="showform" :postId="postId" @close="showform = false"
                @statusUpdated="handleAction('Rescued')" /> <!-- Nov12 -->

            <button type="button" class="bg-red-100 py-4 w-full hover:bg-red-500 hover:text-white rounded-br-lg"
                @click="handleAction('Cancelled')"> <!-- Nov5 -->
                Cancel
            </button>
        </div>

        <div v-if="showConfirmRescue" class="flex justify-center py-4 text-[13px] gap-x-6 bg-slate-50">
            <span>Are you sure about this status?</span>
            <!-- Nov12 @click="confirmRescued"-->
            <button type="button" class="text-green-700" @click="confirmRescued">
                Yes
            </button>
            <button type="button" class="text-red-700" @click="cancelAction">
                No
            </button>
        </div>
        <!-- Nov5 change showConfirmCancel to -->
        <div v-if="showCancelConfirm" class="flex justify-center py-4 text-[13px] gap-x-6 bg-slate-50">
            <span>Are you sure you want to cancel your action?</span>
            <button type="button" class="text-green-700" @click="cancelRescue"> <!-- Nov5 -->
                Yes
            </button>
            <button type="button" class="text-red-700" @click="cancelAction"> <!-- Nov5 -->
                No
            </button>
        </div>

        <div v-if="showSuccessMessage" class="flex justify-center py-2 text-[12px] bg-green-50">
            <!-- <span>Rescued Succesfully</span> -->
            <span>{{ successMessage }}</span> <!-- Nov5 -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import RescueFillupFormModal from "@/components/Shelter/shelter_RescueOp_FillupForm.vue"; // Nov12
const showform = ref(false); // Nov12

// converted into <script setup> salpocial's code below
const props = defineProps({
    postId: {
        type: Number,
        required: true
    },
    operation: {
        type: String,
        required: false
    }
});

const emit = defineEmits(['statusUpdated']);

const showRescueCancelButtons = ref(false);
const showSuccessMessage = ref(false);
const showConfirmDialog = ref(false);
const showCancelConfirm = ref(false); // Nov12
const successMessage = ref('');
const selectedAction = ref('');

const handleAction = (action) => { // Nov12
    selectedAction.value = action;
    if (action === 'Rescued') {
        console.debug('Attempting to rescue with postId:', props.postId); // Debug line
        showform.value = true;
    } else if (action === 'Cancelled') {
        showCancelConfirm.value = true;
    }
};

// Wla Nov12
// const confirmRescued = async () => { //rescued => yes 
//     try {
//         const response = await axios.post('http://localhost:5000/confirmRescue', {
//             post_id: props.postId,
//             shelter_id: localStorage.getItem('c_id')
//         });

//         if (response.data.success) {
//             showConfirmDialog.value = false;
//             emit('statusUpdated');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle error (show error message)
//     }
// }
const cancelRescue = async () => { //rescued => yes
    if (!props.postId) {
        console.error('Error: postId is undefined.');
        return; // Exit the function early
    }
    console.debug('Cancelling rescue for postId:', props.postId); // Debug line
    try {
        const response = await axios.post('http://localhost:5000/cancelOperation', {
            _post_id: props.postId,
            _shelter_id: localStorage.getItem('c_id')
        });

        if (response.data.success) {
            showCancelConfirm.value = false;
            showSuccessMessage.value = true;
            successMessage.value = 'Operation cancelled successfully';
            emit('statusUpdated');
        }
    } catch (error) {
        console.error('Error:', error);
        showSuccessMessage.value = true;
        successMessage.value = 'Error occurred while cancelling operation';
    }
}

const cancelAction = () => {
    showConfirmDialog.value = false;
    showRescueCancelButtons.value = true;
};

// Nov12 let button_flag = ref('') change to
const button_flag = ref('');
onMounted(() => {
    button_flag.value = props.operation
    console.log("flag", button_flag.value)
})

</script>
<!-- 
// Nov5 orig salpocial's code
// export default {
//     props: {
//         postId: {
//             type: Number,
//             required: true
//         }
//     },
//     emits: ['statusUpdated'],
//     setup(props, { emit }) {
//         const showRescueCancelButtons = ref(false);
//         const showSuccessMessage = ref(false);
//         const showConfirmDialog = ref(false);
//         const successMessage = ref('');
//         const selectedAction = ref('');

//         const handleAction = (action) => {
//             selectedAction.value = action;
//             showRescueCancelButtons.value = false;
//             showConfirmDialog.value = true;
//         };

//         const confirmAction = async () => {
//             try {
//                 const response = await axios.post('http://localhost:5000/accept-rescue', {
//                     post_id: props.postId,
//                     shelter_id: localStorage.getItem('c_id'),
//                     status: selectedAction.value
//                 });

//                 if (response.data.success) {
//                     showConfirmDialog.value = false;
//                     showSuccessMessage.value = true;
//                     successMessage.value = `${selectedAction.value} Successfully`;
//                     emit('statusUpdated');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 // Handle error (show error message)
//             }
//         };

//         const cancelAction = () => {
//             showConfirmDialog.value = false;
//             showRescueCancelButtons.value = true;
//         };

//         return {
//             showRescueCancelButtons,
//             showSuccessMessage,
//             showConfirmDialog,
//             successMessage,
//             handleAction,
//             confirmAction,
//             cancelAction
//         };
//     }
// } -->
