<template>
    <div class="header">
        <div class="title-wrapper">
            <h1>To do</h1>
            <img src="../assets/icon-sun.svg" alt="" v-if="this.theme == 'light'" @click="$emit('switch-theme')">
            <img src="../assets/icon-moon.svg" alt="" v-else @click="$emit('switch-theme')">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        theme: String
    },
    emits: ['switch-theme']
}
</script>

<style>
.header {
    min-height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.header .title-wrapper {
    display: flex;
    position: absolute;
    justify-content: space-between;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100%;
    z-index: 100;
    align-items: center;
    padding: 0 35%;
}

.header .title-wrapper h1 {
    text-transform: uppercase;
    font-size: 50px;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 700;
    color: #ffffff;
}

#app .top-image {
    position: absolute;
    inset: 0 0 auto 0;
    width: 100%;
    height: fit-content;
    max-height: 280px;
}

@media(max-width:768px) {
    .header .title-wrapper h1 {
        font-size: 28px;
    }

    .header {
        min-height: 180px;
    }
    #app .top-image {
        min-height: 200px;
    }

}
</style>