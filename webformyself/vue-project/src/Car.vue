<template>
    <div>
        <h3>Name: {{carName}}</h3>
        <p>Year: {{carYear}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                carName: 'Ford',
                carYear: 2015
            }
        }
    }
</script>

<style>

</style>