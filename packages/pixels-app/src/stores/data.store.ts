import { defineStore } from 'pinia';
import {ref} from "vue";

export const useDataStore = defineStore('data', () => {
    const pageTitle = ref('Title')

    function setPageTitle(title: string) {
        pageTitle.value = title
    }

    return { pageTitle, setPageTitle }
})