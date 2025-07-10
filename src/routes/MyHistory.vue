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
h2 {
    margin: 1.25rem;
}

button {
    border-radius: 0.625rem;
    font-size: 1.125rem;
    border: 0.5px solid #330fe5;
    background-color: #fff;
    color: #330fe5;
    font-weight: 700;
    margin-top: 1.25rem;
    padding: 0.3125rem 0.625rem;

}

ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.625rem;
    padding: 0;
    list-style: none;

}

ul li {
    border-bottom: 0.0625rem solid #330fe5;
}
</style>