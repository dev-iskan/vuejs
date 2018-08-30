<template>
    <div>
        <button class="btn btn-success" @click ="updateCounter(1)">Add</button>
        <button class="btn btn-danger" @click ="updateCounter(-1)">Substract</button>
    </div>
</template>

<script>
    export default {
        methods: {
            updateCounter(val){
                this.$emit('counterUpdated', val);
            }
        }
    }
</script>

<style scoped>

</style>