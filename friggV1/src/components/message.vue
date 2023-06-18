<template>
    <div :class="this.$store.state.message.status" :id="this.$store.state.message.type">
        <button @click="hide"></button>        
        <h1 v-if="this.$store.state.message.type" :class="this.$store.state.message.type">{{this.$store.state.message.type}}</h1>
        <h3 v-if="this.$store.state.message.message" :class="this.$store.state.message.type">{{this.$store.state.message.message}}</h3>
    </div>
</template>
<script>
export default {
    name: 'message-comp',
    methods: {
        hide() {
            this.$store.state.message.status = 'hidden';
            this.$store.state.message.type = '';
        }
    }
}

</script>
<style scoped>
    div.hidden, div {
        opacity: 0;
        height: 0px;
        position: absolute;
        width: 300px;
        height: 0;
        top: 10px;
        right: calc(50% - 150px);
        background-color: #333;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 8px;
        /* transition: opacity 0.3s; */
        transition: height 0.3s, opacity 0.3s;
        overflow: hidden;
    }

    .show {
        opacity: 1;
        height: auto;
        padding: 16px;

    }

    #error h3, #error h1{
        color: rgb(172, 0, 0);
        font-weight: 550;
    }

    #success h3, #success h1{
        color: rgb(64, 182, 197);
        font-weight: 550;
    }

    #success button {
        display: none;
    }

    button {
        position: absolute;
        top: 4px;
        right: 4px;
        height: 28px;
        width: 28px;
        margin: 0;
        border: none;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #333;
        border-radius: 6px;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    button:hover {
        background-color: #444;
    }

    h1 {
        text-transform: uppercase;
    }

</style>