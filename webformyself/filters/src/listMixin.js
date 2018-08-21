export default {
    data() {
        return {
            fruits: ['apple', 'banana', 'orange', 'peach'],
            search: ''
        }
    },
    computed: {
        filteredFruits(){
            return this.fruits.filter(fruit=>{
                return fruit.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            })
        }
    }
}