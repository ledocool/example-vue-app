<template>
    <div class="editor-line">
        <div class="label">
            <label v-if="this.label != null">{{label}}</label>
        </div>
        <div class="input">
            <!-- <textarea :name="name" v-model="message_slug" :disabled="is_disabled" /> -->
            <VAceEditor
                ref="aceRef"
                v-model:value="message_slug"
                style="height: 300px"
                :options="{ useWorker: false }"
                />
        </div>

        
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { VAceEditor } from 'vue3-ace-editor';

    export default {
        name: "MultiLineEdit",
        data() {
            return {
                message_slug: ''
            }
        },
        components: {
            VAceEditor: VAceEditor
        },
        props: {
            label: null,
            name: null, 
            value: '',
            is_disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
        },
        watch: {
            message_slug: {
                handler: function (x) {
                    this.$emit('valueChanged', x);
                },
                immediate: false
            },
            value: {
                handler: function (x) {
                    this.message_slug = x;
                },
                immediate: false
            }
        },
        mounted() {
            this.message_slug = this.value;
        }
    };
</script>

<style scoped>
    .label, .input {
        display: inline-block;
    }

    .label {
        margin-right: 5px;
        min-width: 39%;
        vertical-align: top;
    }

    .input {
        width: 60%;
    }

    .input > textarea {
         width: 100%;
    }

    .editor-line {
        margin-top: 15px;
        margin-bottom: 10px;
        width: 100%;
        border-top: dashed 1px #2f2014;
    }
</style>