<template>
    <div class="table-wrapper">
        <router-link class="addbtn" :to="{ path: '/add-book' }">Add</router-link>
        <table>
            <thead> <tr> <td>Id</td> <td>Title</td> <td>Author</td> <td>Year published</td> <td>Index</td> <td>Actions</td> </tr> </thead>
            <tbody>
                <tr v-for="item of bookEntries" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.author}}</td>
                    <td>{{item.yearPublished}}</td>
                    <td>{{item.bookIndex}}</td>
                    <td><router-link :to="{ path: '/edit-book/' + item.id }">Edit</router-link> <button v-on:click="deleteBook(item.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "BookTable",
        data() {
            return {
                bookEntries: []
            }
        },
        mounted() {
            this.getBookList();
        },
        computed: mapState({
        }),
        methods: {
            getBookList: function () {
                var self = this;
                fetch(this.$store.state.config.API_URL + '/Book')
                .then(function (response) {
                    return response.json()
                }).then(response => {
                    self.bookEntries = response.books;
                });
            },
            deleteBook(id) {
                fetch(this.$store.state.config.API_URL + '/Book/' + id, {
                    method: 'DELETE',
                    headers: {
                    }
                }).then(function (response) {
                    if (response.status == 401 || response.status == 403) {
                        // this.$store.commit('purgeToken');
                        // this.$router.push("/admin");
                    }else{
                        return response.json()
                    }
                }).then(() => {
                    this.getBookList();
                }).error((error) => {
                    if (error.status == 401 || error.status == 403) {
                        // this.$store.commit('purgeToken');
                        // this.$router.push("/admin");
                    }
                });
            }
        },
    }
</script>

<style scoped>
    .addbtn {
        font-size: 24px;
    }
    thead {
        background-color: #2f2014;
        color: white;
    }
    tr {
        border: dotted 1px #2f2014;
    }
    td {
        border: dotted 1px #2f2014;
    }
</style>