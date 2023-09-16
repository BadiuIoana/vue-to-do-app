<template>
    <form id="add-task" :class="['add-task', theme]" @submit="onSubmit">
        <input type="checkbox" name="task-completed" v-model="isChecked">
        <input type="text" name="description" v-model="description" placeholder="Create a new todo...">
        <!-- <button class="submit">+</button> -->
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
.add-task {
    display: flex;
    align-items: center;
    z-index: 10;
}

.add-task input[type='text'] {
    padding: 0.5rem 0.5rem 0.5rem 0;
    flex-grow: 1;
    margin: 1rem;
    outline: none;
    font-size: 18px;
    font-family:'Josefin Sans', sans-serif;
    background:transparent;
    border: none;
}

.add-task.dark  input[type='text'] {
    color:#ffffff;
}

</style>
