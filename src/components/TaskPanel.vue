<template>
    <div class="task-panel" :class="theme">
        <add-task-form :theme="theme" @add-new-task="addTask"></add-task-form>
        <div class="drop-zone" v-if="showTasks.length">
            <list-element v-for="task in showTasks" class="list-item" :id="task.id" :key="task.id" :task="task"
                draggable="true" @delete-task="deleteTask(task.id)" @toggle-checked="toggleChecked(task.id)"
                @dragstart="startDrag($event, task)" @drop="onDrop($event, task)" @dragover.prevent
                @dragenter.prevent></list-element>
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
            <p class="clear-completed" @click="clearCompleted">Clear Complted</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        theme: String
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
        },
        toggleChecked(id) {
            const specificTask = this.tasks.find((task) => task.id == id);
            specificTask["isChecked"] = !specificTask["isChecked"];
        },
        clearCompleted() {
            this.tasks = this.tasks.filter((task) => !task.isChecked);
            this.showTasks = "all";
        },

        // Drag and drop methods
        startDrag(event, task) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('dragTaskId', task.id);
            document.querySelector(".drop-zone").style.opacity = 0.7;
            event.target.classList.add("selected");

        },
        onDrop(event, task) {
            const dragTaskId = event.dataTransfer.getData('dragTaskId');
            const dropTaksId = task.id;
            const dragIndex = this.tasks.findIndex(task => task.id == dragTaskId);
            const dropIndex = this.tasks.findIndex(task => task.id == dropTaksId);
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

            this.tasks.push(newTask);
        }
    },

};
</script>
<style>
.task-panel {
    position: absolute;
    top: 31%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.4rem;
    width: 600px;
}

.task-panel.dark {
    background-color: #0a2e44;
    color: #fff;
}

.task-panel.light {
    background-color: #fff;
    border: 1px solid #0a2e44;
    color: #0a2e44;

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
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.options .filters {
    display: flex;
    gap: 1rem;
}

.options p {
    font-size: 18px;
    font-weight: 400;
    font-family: "Josefin Sans", sans-serif;
}

.selected {
    background-color: rgb(70, 74, 129);
}

@media(max-width: 768px) {
    .task-panel {
        width: 100%;
        padding: 0 1rem;
    }

    .options {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        justify-content: left;
        text-align: left;
        gap: 0.4rem;
    }

    .options .filters {
        flex-direction: column;
        gap: 0;
    }

    .add-task {
        flex-wrap: wrap;
    }

    .header .title-wrapper {
        padding: 0 1rem;
    }
}
</style>
