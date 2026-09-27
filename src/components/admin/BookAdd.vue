<template>
    <div class="game">
        <div class="background">
            <form @submit.prevent="uploadBook">
                <BookEditor v-bind:entry="entry"
                            v-bind:error="error"
                            editorTitle="Add book"
                            :is_edit="false"
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
        name: "BookAdd",
        data() {
            return {
                error: null,
                entry: {
                    id: '',
                    title: '',
                    author: '',
                    yearPublished: new Date,
                    bookIndex: '<root>\n\t<chapter>\n\t\t<name></name><page></page>\n\t</chapter>\n</root>'
                },
            }
        },
        components: {
            BookEditor
        },
        computed: mapState({
            //token: state => "Bearer " + state.token,
        }),
        methods: {
            uploadBook: function () {
                var self = this;
                var data = {
                    "author": self.entry.author,
                    "title": self.entry.title,
                    "yearPublished": self.entry.yearPublished,
                    "bookIndex": self.entry.bookIndex
                };
                fetch(self.$store.state.config.API_URL + '/Book/', {
                    method: 'POST',
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
