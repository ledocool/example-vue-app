<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard">
            <button :class="{tab: true, active: tabs.indexOf(tab) == selectedTab}" v-bind:key="tab.name" v-for="tab of tabs" v-html="tab.name" v-on:click="selectTab(tabs.indexOf(tab))"></button>
            <div class="shown-container">
                <keep-alive>
                    <component v-bind:is="this.tabs[this.selectedTab].component"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import BookTable from './BookTable.vue';
    import { shallowRef } from 'vue'

    export default {
        name: "Dashboard",
        data() {
            return {
                selectedTab: 0,
                tabs: [
                    {
                        name: "Books",
                        component: shallowRef(BookTable)
                    },
                ]
            }
        },
        components: {
            BookTable: BookTable
        },
        mounted() {
            // if (this.$store.state.token === undefined || this.$store.state.token === null || this.$store.state.token === '') {
            //     this.$router.push("/admin")
            // }
        },
        methods: {
            selectTab(index) {
                this.selectedTab = index;
            }
        }
    }
</script>

<style scoped>
    .admin-dashboard{
        margin:0 auto;
        padding: 15px;
    }
    button.tab {
        background-color: #baa48f;
        border:none;
        padding: 4px;
        cursor: pointer;
    }
    button.tab.active {
        border-top: solid 2px #2f2014;
        font-weight: bold;
    }
    .shown-container {
        background-color: #baa48f;
        color: #2f2014;
        padding:5px
    }
</style>