<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="open = false">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <div class="flex items-center justify-between">
                                            <DialogTitle class="text-2xl font-bold leading-6 text-gray-700">
                                                Shelter Overview
                                            </DialogTitle>
                                            <div class="sm:ml-8 md:ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative rounded-md text-gray-800 hover:text-gray-700"
                                                    @click="open = false">
                                                    <span class="absolute -inset-2.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <div class="card">
                                            <Chart type="line" :data="chartData" :options="chartOptions"
                                                class="h-[30rem] text-gray-700 text-sm" />
                                        </div>
                                    </div> -->


                                    <!-- start -->

                                    <div class="p-4">
                                        <div v-for="(report, index) in rescuedposts" :key="report.post_id" class="border">
                                        <span class="flex gap-5 text-sm items-center">
                                            Reported by:
                                            <span class="hover:underline cursor-pointer">{{
                                                report.posted_by }}</span>
                                        </span>
                                        <span class="flex gap-5 text-sm">Report Type:
                                            <h1 class="font-bold text-sm flex gap-3">{{ report.post_type }}</h1>
                                        </span>
                                        <span class="flex gap-10 text-sm">Location:
                                            <p class="font-semibold text-sm">{{ report.report_address_location
                                                }}</p>
                                        </span>
                                    </div>
                                    </div>
                                    <!-- end -->
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
// chart
// import Chart from 'primevue/chart';
// onMounted(() => {
//     chartData.value = setChartData();
//     chartOptions.value = setChartOptions();
// });

// let posts = ref([])

// async function retrieveRescuedReports() {
//    try {
//        console.log("retrieve rescue Reportssss");

//        const response = await axios.post("http://localhost:5000/gethandledrescuehistory", {
//            _report_status: 'Rescued',
//            _handled_by: _user_id,
//        });

//        if (response.data && response.data.length > 0) {
//             posts.value = response.data
//             console.log("response", response.data);
//             console.log("posts value", posts.value);
//         } else {
//            console.log("No data returned from the server.");
//        }
//        console.log("post value isdhsjdgskhdk", posts.value)

//    } catch (err) {
//        console.error("Error in retrieve rescue reports", err);
//    }
// }

let ongoingReport = ref([])
let _user_id = localStorage.getItem('u_id')
async function retrieveprogressReports() {
    console.log("retrieveReports in progress!!!")

    try {
        const response = await axios.post("http://localhost:5000/getongoingoperations", {
            _shelter_id: _user_id,
            _status: 'In progress'
        });

        if (response.data && response.data.length > 0) {
            ongoingReport.value = response.data
        }
        console.log("post value", ongoingReport.value)
    }
    catch (err) {
        console.log("error in retrieve operations", err)
    }
}

let rescuedposts = ref([])
async function retrieveRescuedReports() {
    try {
        console.log("retrieveReports in rescueeeee")
        const response = await axios.post("http://localhost:5000/getrescuedhistory", {
            _report_status: 'Rescued',
            _handled_by: _user_id
        });
        rescuedposts.value = response.data
        console.log("response", response.data)

        console.log("post value", rescuedposts.value)
    }
    catch (err) {
        console.log("error in retrieve reports", err)
    }
}

onMounted(async () => {
    retrieveprogressReports()
    retrieveRescuedReports()
})

// const chartData = ref();
// const chartOptions = ref();

// const setChartData = () => {

//     return {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//             {
//                 label: 'Rescue',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 fill: false,
//                 borderColor: '#4cf7db',
//                 tension: 0.4
//             },
//             {
//                 label: 'Adoption',
//                 data: [28, 48, 40, 19, 86, 27, 100],
//                 fill: false,
//                 borderColor: '#f7ad4c',
//                 tension: 0.4
//             }
//         ]
//     };
// };
// const setChartOptions = () => {
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--p-text-color');
//     const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
//     const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

//     return {
//         maintainAspectRatio: false,
//         aspectRatio: 0.6,
//         plugins: {
//             legend: {
//                 labels: {
//                     color: textColor
//                 }
//             },
//         },
//         scales: {
//             x: {
//                 ticks: {
//                     color: textColorSecondary
//                 },
//                 grid: {
//                     color: surfaceBorder
//                 }
//             },
//             y: {
//                 ticks: {
//                     color: textColorSecondary
//                 },
//                 grid: {
//                     color: surfaceBorder
//                 }
//             }
//         }
//     };
// }
</script>