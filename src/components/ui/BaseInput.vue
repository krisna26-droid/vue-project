<template>
    <div>
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
            <slot></slot>
        </label>

        <!-- Input normal -->
        <input
            v-if="!isImage"
            class="form-control"
            :type="type"
            :id="identity"
            :placeholder="Placeholder"
            :readonly="readonly === '1'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <!-- Input Image -->
        <div v-else>
            <input
                type="file"
                class="form-control"
                :id="identity"
                accept="image/*"
                @change="handleImageUpload"
            />

            <!-- Preview jika ada -->
            <!-- <img
                v-if="preview"
                :src="preview"
                alt="Preview"
                class="mt-3"
                style="max-width: 150px; border-radius: 8px;"
            /> -->
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: { type: [String, Number, File], default: '' },
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    Placeholder: { type: String, required: false },
    readonly: { type: String, default: '0' },
    isImage: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const preview = ref(null);

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        emit("update:modelValue", file); // kirim file ke parent
        preview.value = URL.createObjectURL(file); // buat preview
    }
};
</script>
