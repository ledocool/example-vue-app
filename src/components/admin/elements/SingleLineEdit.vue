<template>
    <div class="editor-line">
        <div class="label">    
            <label v-if="this.label != null">{{label}}</label>
        </div>
        <div class="input">
            <input 
                   :name="name" 
                   type="text" 
                   v-model="innerValue"
                   :disabled="is_disabled" />
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "SingleLineEdit",
        props: {
            label: null,
            name: null,
            value: {
                type: String,
                default() {
                    return '';
                }
            },
            is_disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
        },
        data() {
            return {
                innerValue: ''
            }
        },
        watch: {
            innerValue: {
                handler: function (x) {
                    this.$emit('valueChanged', x);
                },
                immediate: false
            },
            value: {
                handler: function(x) {
                    this.innerValue = x;
                },
                immediate: false
            }
        },
        mounted() {
            this.innerValue = this.value;
        }
    });
</script>

<style scoped>
    .label, .input {
        display: inline-block;
    }
    .label {
        margin-right: 5px;
        min-width: 39%;
    }
    .input {
        width: 60%;
    }
    .input > input {
        width: 100%;
    }
    .editor-line {
        margin-top: 15px;
        margin-bottom: 10px;
        width: 100%;
        border-top: dashed 1px #2f2014;
    }
</style>