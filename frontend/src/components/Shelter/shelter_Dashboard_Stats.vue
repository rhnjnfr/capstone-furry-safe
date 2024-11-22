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

                                    <div class="p-4 px-8 flex flex-col gap-y-3">
                                        <div v-if="rescuedReport && rescuedReport.length > 0">
                                            <h1 class="py-3 font-bold text-lg text-green-600">Rescue Handled</h1>
                                            <div v-for="(rescued, index) in rescuedReport" :key="rescued.post_id"
                                            class="border rounded-2xl p-4">
                                                <span class="flex gap-5 text-sm items-center">
                                                    Reported by:
                                                    <span class="hover:underline cursor-pointer">{{
                                                        rescued.posted_by }}</span>
                                                </span>
                                                <span class="flex gap-5 text-sm">Report Type:
                                                    <h1 class="font-bold text-sm flex gap-3">{{ rescued.post_type }}
                                                    </h1>
                                                </span>
                                                <span class="flex gap-10 text-sm">Location:
                                                    <p class="font-semibold text-sm">{{ rescued.report_address_location
                                                        }}</p>
                                                </span>
                                            </div>
                                        </div>

                                        <div v-if="ongoingReport && ongoingReport.length > 0">
                                            <h1 class="py-3 font-bold text-lg text-amber-600">Ongoing Reports</h1>
                                            <div v-for="(ongoing, index) in ongoingReport" :key="ongoing.post_id"
                                                class="border rounded-2xl p-4">

                                                <span class="flex gap-5 text-sm items-center">
                                                    Reported by:

                                                    <span class="hover:underline cursor-pointer">{{
                                                        ongoing.posted_by }}</span>


                                                </span>
                                                <span class="flex gap-5 text-sm">Report Type:
                                                    <h1 class="font-bold text-sm flex gap-3">{{ ongoing.post_type }}
                                                    </h1>
                                                </span>

                                                <span class="flex gap-10 text-sm">Location:
                                                    <p class="font-semibold text-sm">{{ ongoing.report_address_location
                                                        }}</p>
                                                </span>

                                            </div>
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

let rescuedReport = ref([])
async function retrieveRescuedReports() {
    try {
        console.log("retrieveReports in rescueeeee")
        const response = await axios.post("http://localhost:5000/getrescuedhistory", {
            _report_status: 'Rescued',
            _handled_by: _user_id
        });
        rescuedReport.value = response.data
        console.log("response", response.data)

        console.log("post value", rescuedReport.value)
    }
    catch (err) {
        console.log("error in retrieve reports", err)
    }
}

onMounted(async () => {
    retrieveprogressReports()
    retrieveRescuedReports()
})
</script>