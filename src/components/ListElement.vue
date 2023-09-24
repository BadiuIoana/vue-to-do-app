<template>
    <div class="element">
        <div class="group">
            <input type="checkbox" name="task-completed" id="" @change="$emit('toggle-checked', task.id)"
                :checked="task.isChecked">
            <label for="task-completed" :class="task.isChecked ? 'is-checked' : ''">{{ task.description }}</label>
        </div>

        <button class="delete">
            <img 
                src="../assets/icon-cross.svg" 
                alt="icon-cross" srcset=""
                @click="$emit('delete-task', task.id)">
        </button>
    </div>
</template>

<script>
export default {
    props: [
        'task'
    ],
    emits: ['delete-task', 'drag-start']
}
</script>
<style>
.element {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}

.element:last-of-type {
    border-bottom: none;
}

.element .group {
    padding: 0 1rem;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Josefin Sans', sans-serif;
}

input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    font: inherit;
    color: currentColor;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);
    padding:0.3rem ;
    display: grid;
    place-content: center;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: #ffffff;
}

input[type="checkbox"]:checked {
    background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}

input[type="checkbox"]:checked::before {
    transform: scale(1);

}

input[type="checkbox"]:focus {
    outline: none;
    outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
    cursor: not-allowed;
}

.element .delete {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 1rem;
    opacity: 0;
}

.element:hover .delete {
    opacity: 1;
    transform: opacity 100ms ease-in;
}

label[for="task-completed"] {
    opacity: 1;
    transition: opacity ease-in 1s;
    max-width: 350px;
    word-wrap: break-word;
}

label[for="task-completed"].is-checked {
    text-decoration: line-through;
    opacity: 0.5;
}

@media(max-width: 768px) {
    .element .group  {
        font-size: 15px;
    }
    .element .delete {
        opacity: 1;
    }

    label[for="task-completed"] {
        max-width: 200px;
    }
}
</style>