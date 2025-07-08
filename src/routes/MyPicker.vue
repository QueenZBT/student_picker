<template>
    <div>
        <!-- <h2>随机抽选</h2> -->
        <br>
        <button @click="pickRandom" :disabled="isRolling" class="btn">{{ isRolling ? "抽选中" : "开始抽选" }}</button>
        <h3 v-if="selected">🎉抽中：{{ selected }}</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            students: [],
            history: [],
            selected: '',
            isRolling: false,
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            this.students = JSON.parse(localStorage.getItem('students') || '[]')
            this.history = JSON.parse(localStorage.getItem('history') || '[]')
        },
        pickRandom() {
            if (this.isRolling) return

            const unpicked = this.students.filter(s => !this.history.includes(s))
            if (unpicked.length === 0) {
                this.selected = '所有学生都抽过了'
                return
            }

            this.isRolling = true


            //每100ms随机显示一个名字
            this.rollTimer = setInterval(() => {
                const randomName = unpicked[Math.floor(Math.random() * unpicked.length)]
                this.selected = randomName

            }, 100)

            //动画持续2秒后停止
            setTimeout(() => {
                clearInterval(this.rollTimer)
                const finalIndex = Math.floor(Math.random() * unpicked.length)
                const finalName = unpicked[finalIndex]
                this.selected = finalName
                this.history.push(finalName)
                localStorage.setItem('history', JSON.stringify(this.history))
                this.isRolling = false
            }, 2000)
            // const randomIndex = Math.floor(Math.random() * unpicked.length)
            // const chosen = unpicked[randomIndex]
            // this.history.push(chosen)
            // localStorage.setItem('history', JSON.stringify(this.history))
            // this.selected = chosen
        }
    }
}
</script>

<style scoped>
.btn {
    width: 160px;
    height: 50px;
    font-size: 17px;
    /* padding: 10px 20px; */
    border-radius: 30px;
    color: #fff;
    font-weight: 700;
    background-color: #4307fa;
    border: none;
}
</style>