<template>
  <div class="container">
    <h2>上传学生名单</h2>

    <div class="left">
      <div class="icon-input">
        <input type="text" v-model="newStudent" placeholder="请输入学生姓名">
        <button @click="addStudent" class="btn">添加</button>
      </div>

      <br>
      <br>

      <div class="middle">
        <textarea placeholder="每行一个姓名" rows="5" cols="30" v-model="batchInput"></textarea>
        <br>
        <button @click="addBatch">批量添加</button>
      </div>



      <input type="file" @change="importExcel" accept=".xls,.xlsx">

    </div>

    <hr>
    <div class="right">
      <ul>
        <li v-for="(student, index) in students" :key="index">
          {{ student }}
          <button @click="remove(index)">删除</button>
        </li>
      </ul>
      <button @click="clearAllNames">清空</button>
    </div>

  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      newStudent: '',
      batchInput: '',
      students: JSON.parse(localStorage.getItem('students') || '[]')
    }
  },
  methods: {
    addStudent() {
      if (this.newStudent.trim()) {
        this.students.push(this.newStudent.trim())
        this.newStudent = ''
        this.save()
      }
    },
    addBatch() {
      const lines = this.batchInput
        .split('\n')
        .map(name => name.trim())
        .filter(name => name !== '')
      this.students.push(...lines)
      this.batchInput = ''
      this.save()
    },
    remove(index) {
      this.students.splice(index, 1)
      this.save()
    },
    save() {
      localStorage.setItem('students', JSON.stringify(this.students))
    },
    importExcel(event) {

      const file = event.target.files[0]
      if (!file) return alert('请上传excel文件')

      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        const names = json
          .filter(row => Array.isArray(row) && row.length > 0)
          .map(row => row[0])
          .filter(name => typeof name === 'string' && name.trim() !== '')
        this.students = Array.from(new Set(this.students.concat(names)))
        this.save()
        alert(`成功导入${names.length}个学生`)
      }

      reader.readAsArrayBuffer(file)
    },
    clearAllNames() {
      this.students = []
      this.save()
    }

  }
}
</script>

<style scoped>
.left {
  width: 400px;
  height: 280px;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
  border: 2px dashed #330fe5;
  border-radius: 10px;
  /* background-color: skyblue; */
  margin-bottom: 20px;
}



.right {
  margin-top: 20px;
}

.right ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  list-style: none;
  padding: 0;
}

input[type='text'] {
  width: 220px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 10px;

}

.icon-input {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 50px;
  /* border: 1px solid black; */
  margin-top: 10px;
}

.icon-input input {
  position: absolute;
  left: 40px;
  top: 5px;
}

.icon-input::after {
  content: '\e605';
  /* 你从 iconfont 上复制的编码 */
  font-family: 'iconfont';
  /* 通常是 iconfont，而不是 icon-chongwu */
  position: absolute;
  left: 245px;
  top: 28px;
  transform: translateY(-50%);
  font-size: 23px;
  color: #330fe5;
}

.btn {
  margin-left: 10px;
  width: 70px;
  height: 42px;
  border-radius: 10px;
  font-size: 18px;
  border: 0.5px solid #330fe5;
  background-color: #fff;
  color: #330fe5;
  font-weight: 700;
  position: absolute;
  top: 5px;
  right: 50px;

}

.middle {
  margin-bottom: 20px;
}

textarea {
  border-radius: 10px;
  width: 328px;
  height: 95px;

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-left: 10px;

}

input[type='file'] {
  margin-bottom: 20px;
}

button {


  border-radius: 10px;
  font-size: 18px;
  border: 0.5px solid #330fe5;
  background-color: #fff;
  color: #330fe5;
  font-weight: 700;

}
</style>