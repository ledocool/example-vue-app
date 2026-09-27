<template>
    <div class="home">
        <div class="background">
            <div class="list-container">
                <h2>Books</h2>
                <div class="column">
                    <Dashboard />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Dashboard from "./admin/Dashboard.vue";

    export default {
        name: 'Home',
        data() {
        },
        components: {
            Dashboard: Dashboard
        },
        methods: {
        },
        mounted() {
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h2 {
        color: #2f2014;
    }

    .list {
        display: flex;
        flex-direction: row;
    }

    .list-container {
        margin-left: -5px;
        margin-right: -5px;
    }

    .list-elem {
        width: 25%;
        padding: 2px 4px 2px 2px;
    }
</style>

