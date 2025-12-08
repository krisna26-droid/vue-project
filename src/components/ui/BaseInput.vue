<template>
    <div>
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
            <slot></slot>
        </label>

        <input
            class="form-control"
            :class="{ 'd-none': isImage }"
            :type="type"
            :id="identity"
            :placeholder="Placeholder"
            :readonly="readonly === '1'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="$emit('keyInput', $event.target.value)"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    Placeholder: { type: String, required: false },
    readonly: { type: String, default: '0' },
    isImage: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);
</script>
