<template>
    <div class="content" :class="theme">
        <add-task-form
            :theme="theme"
            @add-new-task="addTask"
            class="add-new-section"
        ></add-task-form>
        <div class="task-panel" :class="theme">
            <div class="drop-zone" v-if="showTasks.length">
                <list-element
                    v-for="task in showTasks"
                    class="list-item"
                    :id="task.id"
                    :key="task.id"
                    :task="task"
                    draggable="true"
                    @delete-task="deleteTask(task.id)"
                    @toggle-checked="toggleChecked(task.id)"
                    @dragstart="startDrag($event, task)"
                    @drop="onDrop($event, task)"
                    @dragover.prevent
                    @dragenter.prevent
                ></list-element>
            </div>
            <div class="drop-zone no-items" v-else>
                <p>There is no data available.</p>
            </div>
            <div class="options">
                <p class="items-left">{{ showTasks.length }} items left</p>
                <div class="filters">
                    <p @click="this.actionType = 'all'">All</p>
                    <p @click="this.actionType = 'active'">Active</p>
                    <p @click="this.actionType = 'completed'">Completed</p>
                </div>
                <p class="clear-completed" @click="clearCompleted">
                    Clear Complted
                </p>
            </div>
        </div>
        <p class="info-text">Drag and drop to reorder list</p>
    </div>
</template>

<script>
export default {
    props: {
        theme: String,
    },
    data() {
        return {
            tasks: [
                {
                    id: 1,
                    description: "Jog around the park 3x",
                    isChecked: false,
                },
                {
                    id: 2,
                    description: "10 minutes meditation",
                    isChecked: false,
                },
                {
                    id: 3,
                    description: "Read for 1 hour",
                    isChecked: false,
                },
                {
                    id: 4,
                    description: "Pick up groceries",
                    isChecked: false,
                },
                {
                    id: 5,
                    description: "Complete Todo App on Frontend Mentor",
                    isChecked: false,
                },
            ],
            actionType: "all",
        };
    },
    computed: {
        showTasks() {
            if (this.actionType == "active") {
                return this.tasks.filter((task) => !task.isChecked);
            }

            if (this.actionType == "completed") {
                return this.tasks.filter((task) => task.isChecked);
            }
            return this.tasks;
        },
    },
    methods: {
        deleteTask(id) {
            this.tasks = this.tasks.filter((task) => task.id !== id);
            this.showTasks = "all";
        },
        toggleChecked(id) {
            const specificTask = this.tasks.find((task) => task.id == id);
            specificTask["isChecked"] = !specificTask["isChecked"];
        },
        clearCompleted() {
            this.tasks = this.tasks.filter((task) => !task.isChecked);
        },

        // Drag and drop methods
        startDrag(event, task) {
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("dragTaskId", task.id);
            document.querySelector(".drop-zone").style.opacity = 0.7;
            event.target.classList.add("selected");
        },
        onDrop(event, task) {
            const dragTaskId = event.dataTransfer.getData("dragTaskId");
            const dropTaksId = task.id;
            const dragIndex = this.tasks.findIndex(
                (task) => task.id == dragTaskId
            );
            const dropIndex = this.tasks.findIndex(
                (task) => task.id == dropTaksId
            );
            var temp = this.tasks[dragIndex];
            this.tasks[dragIndex] = this.tasks[dropIndex];
            this.tasks[dropIndex] = temp;
            document.querySelector(".drop-zone").style.opacity = 1;
            document.querySelector(".selected").classList.remove("selected");
        },
        addTask(event, description, isChecked) {
            event.preventDefault();
            const newTask = {
                id: this.tasks.length + 1,
                description: description,
                isChecked: isChecked,
            };
            this.actionType = "all";
            this.tasks.push(newTask);
        },
    },
};
</script>
<style>
.content {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 500px;
}

.content .add-new-section {
    margin: 0 auto 1rem auto;
    border-radius: 0.4rem;
    padding: 0 1rem;
    width: 100%;
}

.content.dark .add-new-section,
.content.dark .task-panel {
    background-color: #0a2e44;
    color: #fff;
}

.content.light .add-new-section,
.content.light .task-panel {
    background-color: #fff;
    border: 1px solid #0a2e44;
    color: #0a2e44;
}

.content .task-panel {
    border-radius: 0.4rem;
    z-index: 10;
}

.content.dark .selected {
    background-color: rgb(70, 74, 129);
}
.content.light .selected {
    background-color: aliceblue;
}

.task-panel.dark .drop-zone.no-items p {
    color: #fff;
    padding: 1rem;
}

.task-panel.light .drop-zone.no-items p {
    color: #0a2e44;
    padding: 1rem;
}

.options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    padding: 1rem;
}

.options .filters {
    display: flex;
    gap: 1rem;
    grid-column: span 2;
    justify-content: center;
}

.options .filters > *{
    cursor: pointer;
}
.options .filters > *:focus {
    color: red;
}
.options p {
    font-size: 18px;
    font-weight: 400;
    font-family: "Josefin Sans", sans-serif;
}

p.items-left {
    font-size: 14px;
    opacity: 0.7;
    text-align: left;
}

p.clear-completed {
    font-size: 14px;
    opacity: 0.7;
    text-align: right;
}

p.info-text {
    text-align: center;
    font-size: 14px;
    margin: 1rem;
}

@media (max-width: 768px) {
    .content.dark .add-new-section,
    .content.light .add-new-section {
        width: calc(100% - 2rem);
    }

    .content .task-panel {
        width: unset;
        margin: 1rem;
        position: relative;
        display: block;
        transform: none;
        top: -50%;
        left: 0;
        min-width: unset;
    }

    .add-task {
        flex-wrap: wrap;
    }

    .header .title-wrapper {
        padding: 0 1rem;
    }

    p.info-text {
        display: none;
    }
}

@media (max-width: 572px) {
    .options {
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        padding: 1rem;
        gap: 0.4rem;
    }

    .options .filters {
        flex-direction: center;
        grid-column: span 2;
        display: flex;
        grid-row: 2;
        margin-top: 2rem;
        gap: 1rem;
    }
}
</style>
