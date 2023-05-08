<template>
    <form id="add-task" :class="['add-task', theme]" @submit="onSubmit">
        <input type="checkbox" name="task-completed" v-model="isChecked">
        <input type="text" name="description" v-model="description" placeholder="Task description">
        <button class="submit">Add new task</button>
    </form>
</template>

<script>
export default {
    props: {
        theme: String
    },
    data() {
        return {
            description: "",
            isChecked: false
        }

    },
    emits: ['add-new-task'],
    methods: {
        onSubmit(e) {
            e.preventDefault();
            if (this.description != '') {
                this.$emit('add-new-task', e, this.description, this.isChecked);
                this.description = "";
                this.isChecked = false;

            }
        }
    }
};
</script>
<style>
.add-task input[type='text'] {
    padding: 0.5rem;
    margin: 1rem;
    border: none;
    border-radius: 0.4rem;
}

.add-task {
    display: flex;
    align-items: center;
    margin-left: 1rem;
}

.add-task button {
    border-radius: 0.5rem;
    padding: 0.4rem 1rem;
    font-weight: 600;
    background: transparent;
}

.add-task.dark button{
    border: 1px solid #fff;
    color: #fff;
}

.add-task.light button {
    border: 1px solid #0a2e44;
    color: #0a2e44;
}

.add-task.add-task.light input[type='text'] {
   border: 1px solid #0a2e44;
}
</style>
