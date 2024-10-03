<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => ({
            _id: '',
            completed: false,
            text: '',
            isCheck: false
        })
    }
});
const emit = defineEmits(['textUpdate']);

const newInputValue = ref('');

const isEdit = ref(false);
const openEditMode = () => {
    isEdit.value = true;
    newInputValue.value = props.item?.text || '';
};

const sending = ref(false);
const updateTodoText = async () => {
    const id = props.item._id;
    if (!id) return;
    sending.value = true;
    const response = await $fetch(`/api/todo/${id}`, {
        method: 'PUT',
        body: { text: newInputValue.value }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        isEdit.value = false;
        //emit 更新數據
        emit('textUpdate', id, newInputValue.value);
    } else {
        alert('失敗');
    }
    sending.value = false;
};
</script>
<template>
    <div
        class="flex bg-white p-2.5 min-h-[50px] items-center gap-2.5 my-2 cursor-default"
        :class="[{ 'opacity-50': item.completed }]"
    >
        <template v-if="isEdit">
            <ElementInput
                v-model="newInputValue"
                class="flex-1 py-1.5"
                :disabled="sending"
                @keydown.enter="updateTodoText()"
            />
            <ElementButton class="p-1 bg-amber-500" :disabled="sending" @click.stop="updateTodoText()">
                <SvgSave />
            </ElementButton>
            <ElementButton class="p-1 bg-rose-600" :disabled="sending" @click.stop="isEdit = false">
                <SvgCancel />
            </ElementButton>
        </template>
        <template v-else>
            <ElementCheckbox :id="item._id" v-model="item.isCheck" />
            <span class="flex-1" :class="[{ 'line-through': item.completed }]">{{ item.text }}</span>
            <ElementButton v-if="item.completed" class="p-1 bg-gray-400">
                <SvgUnChecked />
            </ElementButton>
            <ElementButton v-if="!item.completed" class="p-1 bg-green-600">
                <SvgChecked />
            </ElementButton>
            <ElementButton v-if="!item.completed" class="p-1 bg-amber-500" @click.stop="openEditMode()">
                <SvgEdit />
            </ElementButton>
            <ElementButton class="p-1 bg-rose-600">
                <SvgDelete />
            </ElementButton>
        </template>
    </div>
</template>
