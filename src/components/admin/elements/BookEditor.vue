<template>
    <div class="editor">
        <div class="column">
            <h2>{{editorTitle}}</h2>
            <div class="error" v-if="this.error != null"><p v-html="this.error"></p></div>

            <input class="savebtn" type="submit" value="Save" />
            <router-link class="cancelbtn" :to="{ path: '/' }">Cancel</router-link>

            <SingleLineEdit name="title"
                            label="Title"
                            v-bind:value="entry.title"
                            @valueChanged="v => onTitle(v)" />

            <SingleLineEdit name="author"
                            label="Author"
                            v-bind:value="entry.author"
                            @valueChanged="v => onAuthor(v)" />

            <DateEdit name="yearPublished"
                           label="Year published"
                           v-bind:value="entry.yearPublished"
                           @valueChanged="v => onYear(v)" />

            <MultiLineEdit name="bookIndex"
                           label="Book index"
                           v-bind:value="entry.bookIndex"
                           @valueChanged="v => onIndex(v)" />

        </div>
    </div>
</template>

<script>
    import SingleLineEdit from './SingleLineEdit.vue';
    import MultiLineEdit from './MultiLineEdit.vue';
    import DateEdit from './DateEdit.vue';

    export default {
        name: "BookEditor",
        model: {
            prop: 'entry',
            event: 'change'
        },
        props: {
            error: "AAAAAA",
            is_edit: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            editorTitle: {
                type: String,
                default() {
                    return 'Title';
                }
            },
            entry: {
                id: {
                    type: String,
                    default() {
                        return null;
                    }
                },
                title: {
                    type: String,
                    default() {
                        return null;
                    }
                },
                author: {
                    type: String,
                    default() {
                        return null;
                    }
                },
                yearPublished: {
                    type: Date,
                    default() {
                        return null;
                    }
                },
                bookIndex: {
                    type: String,
                    default() {
                        return null;
                    }
                },
            }
        },
        components: {
            SingleLineEdit,
            MultiLineEdit,
            DateEdit
        },
        methods: {
            onIndex(x) {
                this.$emit('modelEdit', {
                    id: this.entry.id,
                    yearPublished: this.entry.yearPublished,
                    title: this.entry.title,
                    author: this.entry.author,
                    bookIndex: x
                });
            },
            onAuthor(x) {
                this.$emit('modelEdit', {
                    id: this.entry.id,
                    yearPublished: this.entry.yearPublished,
                    title: this.entry.title,
                    author: x,
                    bookIndex: this.entry.bookIndex
                });
            },
            onTitle(x) {
                this.$emit('modelEdit', {
                    id: this.entry.id,
                    yearPublished: this.entry.yearPublished,
                    title: x,
                    author: this.entry.author,
                    bookIndex: this.entry.bookIndex
                });
            },
            onYear(x) {
                this.$emit('modelEdit', {
                    id: this.entry.id,
                    yearPublished: x,
                    title: this.entry.title,
                    author: this.entry.author,
                    bookIndex: this.entry.bookIndex
                });
            },
        },
    }
</script>

<style scoped>
    .savebtn {
        margin: 15px;
        font-size: 24px;
        color: #2f2014;
        background-color: #c3ffa8;
        border: none;
    }
    .cancelbtn {
        margin: 6px;
        font-size: 15px;
        color: #2f2014;
        background-color: #ffa8a9;
        border: none;
    }
    .error {
        overflow: auto;
        max-width: 50%;
        max-height: 150px;
        color: red;
    }
</style>