<template>
    <!-- <TransitionRoot as="template" :show="dogDetailsOpen"> 
        <Dialog as="div" class="relative z-30" @close="dogDetailsOpen = false"> -->
    <TransitionRoot as="template" :show="open = true">
        <Dialog as="div" class="relative z-30" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-left sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white shadow-lg transition-all w-[60rem] p-6">
                            <h3 class="text-lg font-semibold leading-6 text-gray-900">Dog Details</h3>
                            <div class="mt-4 flex border rounded-lg">
                                <!-- New content starts here -->
                                <div class="bg-red-50 w-[50%]">
                                    <img :src="require('@/assets/images/homepage.png')" alt="Dog Details"
                                        class="flex-shrink-0 w-[30rem] sm:h-fit xl:h-[40rem] object-contain" />
                                </div>
                                <div class="bg-green-50 w-[50%] text-sm">
                                    <div class="border-b px-4 py-4">
                                        <p class="font-bold">Name</p>
                                    </div>
                                    <div class="flex gap-3 items-center mt-2 mx-3">

                                        <img :src="require('@/assets/images/eric.png')" alt="profile"
                                            class="w-10 rounded-full" />

                                        <p class="font-meduim">amboottttttt</p>
                                    </div>
                                </div>
                                <!-- New content ends here -->
                            </div>
                            <div class="flex justify-end w-full mt-4">
                                <button type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    @click="dogDetailsOpen = false">Close</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
</Script>