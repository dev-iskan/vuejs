<template>
    <div>
        <h2>Counter {{counter}}</h2>
    </div>
</template>

<script>
    export default {
        computed: {
            counter() {
                // return this.$store.state.counter 
                return this.$store.getters.computedCounter
            }
        },
    }
</script>

<style scoped>

</style>