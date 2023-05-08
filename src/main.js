import { createApp } from 'vue'
import App from './App.vue';

import headerComponentVue from './components/headerComponent.vue';
import TaskPanel from './components/TaskPanel.vue';
import ListElement from './components/ListElement.vue';
import AddTaskForm from './components/AddTaskForm.vue';

const app = createApp(App);
app.component('header-component', headerComponentVue);
app.component('task-panel', TaskPanel);
app.component('list-element', ListElement);
app.component('add-task-form', AddTaskForm);
app.mount('#app')
