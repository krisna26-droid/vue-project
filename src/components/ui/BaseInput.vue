<template>
    <div>
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
            <slot></slot>
        </label>
        <input class="form-control" :type="type" :id="identity"
            :placeholder="Placeholder" :value="modelValue"
            :readonly="readonly === '1'" 
            :class="[{ 'd-none': isImage }, 'form-control']"
        />
    </div>
</template> 

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    type: {type: String, require: true},
    label: {type: String, require: true},
    identity: {type: String, require: true},
    Placeholder: {type: String, require: false},
    readonly: {type: String, require: true, default: '0'},
    isImage: {type: Boolean, require: true, default: false},
})
</script>