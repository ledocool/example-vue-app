import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import { createStore } from 'vuex'

import Home from './components/Home.vue';
import BookAdd from './components/admin/BookAdd.vue';
import BookEdit from './components/admin/BookEdit.vue';

import config from './config.js'

import ace from 'ace-builds';

import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);

import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);

import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'; // For vite
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);

let siteName = 'Not rocket science';

const routes = [
    {
        path: '/',
        component: Home,
        meta: { title: siteName }
    },
    {
        path: '/add-book',
        component: BookAdd,
        meta: { title: siteName + " EDIT" }
    },
    {
        path: '/edit-book/:id',
        component: BookEdit,
        meta: { title: siteName + " EDIT"  }
    },
];

const store = new createStore({
    state: {
        token: null,
        config: {
            API_URL: config.API_URL
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        purgeToken(state) {
            state.token = null
        },
        initialiseStore(state) {
            var tokenInStorage = localStorage.getItem('token');
            if (tokenInStorage) {
                state.token = JSON.parse(tokenInStorage);
            }
        }
    },

});

store.subscribe((mutation, state) => {
    localStorage.setItem('token', JSON.stringify(state.token));
});

const router = new createRouter({
    routes: routes,
    history: createWebHistory()
});

router.afterEach((to) => {
    document.title = to.meta.title || config.DEFAULT_TITLE;
});

const app = createApp({
    extends: App,
    beforeCreate() {
        this.$store.commit('initialiseStore')
    }
})
.use(router)
.use(store)
.mount('#app')
