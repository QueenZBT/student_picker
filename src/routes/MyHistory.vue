<template>
    <div>
        <h2>选中历史</h2>
        <ul>
            <li v-for="(s, index) in history" :key="index">{{ s }}</li>
        </ul>
        <button @click="reset">重置记录</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            history: JSON.parse(localStorage.getItem('history') || '[]')
        }
    },
    methods: {
        reset() {
            if (confirm('确定要重置吗？')) {
                localStorage.removeItem('history')
                this.history = []
            }

        }
    }
}
</script>

<style scoped>
button {


    border-radius: 10px;
    font-size: 18px;
    border: 0.5px solid #330fe5;
    background-color: #fff;
    color: #330fe5;
    font-weight: 700;

}

ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 0;
    list-style: none;

}

ul li {
    border-bottom: 1px solid #330fe5;
}
</style>