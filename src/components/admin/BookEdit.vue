<template>
    <div class="game">
        <div class="background">
            <form @submit.prevent="saveBook">
                <BookEditor v-bind:entry="entry"
                            :error="error"
                            editorTitle="Edit game"
                            :is_edit="true"
                            @modelEdit="data => onInput(data)"
                            @error="this.error = $event.message"
                            />
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BookEditor from './elements/BookEditor.vue'

    export default {
        name: "BookEdit",
        data() {
            return {
                error: null,
                entry: {
                    id: '',
                    title: '',
                    author: '',
                    yearPublished: new Date,
                    bookIndex: ''
                },
            }
        },
        components: {
            BookEditor: BookEditor
        },
        computed: mapState({
            // token: state => "Bearer " + state.token,
        }),
        mounted() {
            this.getBook()
        },
        methods: {
            getBook() {
                var bookId = this.$route.params.id;
                fetch(this.$store.state.config.API_URL + '/Book/' + bookId, {
                    headers: {
                        // "Authorization": this.token,
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (response) {
                    if (response.status == 401 || response.status == 403) {
                        // this.$store.commit('purgeToken');
                        // this.$router.push("/admin");
                    }else{
                        return response.json();
                    }
                }).then(response => {
                    this.entry.id = response.book.id;
                    this.entry.title = response.book.title;
                    this.entry.author = response.book.author;
                    this.entry.yearPublished = new Date(response.book.yearPublished);
                    this.entry.bookIndex = response.book.bookIndex;
                });
            },
            saveBook() {
                var self = this;
                var data = {
                    "id": self.entry.id,
                    "author": self.entry.author,
                    "title": self.entry.title,
                    "yearPublished": self.entry.yearPublished,
                    "bookIndex": self.entry.bookIndex
                };
                fetch(self.$store.state.config.API_URL + '/Book/', {
                    method: 'PUT',
                    headers: {
                        // "Authorization": self.token,
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    if (response.status == 401 || response.status == 403) {
                        // this.$store.commit('purgeToken');
                        // this.$router.push("/admin");
                    }else{
                        return response.json();
                    }
                }).then((response) => {
                    if(response.isSuccess == true)
                    {
                        self.$router.push("/");
                    }else{
                        self.error = JSON.stringify(response);
                    }
                }).catch(error => {
                    if (error.status == 401 || error.status == 403) {
                        // self.$store.commit('purgeToken');
                        // self.$router.push("/admin");
                    }
                    self.error = error;
                });
            },
            onInput(data) {
                this.entry = data;
            },
        },

    }
</script>

<style scoped>
</style>
