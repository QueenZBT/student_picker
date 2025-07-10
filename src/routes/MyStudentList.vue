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
      <button @click="clearAllNames" style="margin-top:10px;">清空</button>
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
h2 {
  margin-bottom: 1.25rem;
}

.left {
  /* width: 9%; */
  height: 17.5rem;
  margin: 0.625rem auto;
  text-align: center;
  vertical-align: middle;
  border: 0.125rem dashed #330fe5;
  border-radius: 0.625rem;
  padding: 0.3125rem;
}



.right {
  margin-top: 1.25rem;
}

.right ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.625rem;
  list-style: none;
  padding: 0;
}

input[type='text'] {
  width: 13.75rem;
  height: 2.5rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  padding-left: 0.625rem;

}

.icon-input {
  position: relative;
  display: inline-block;
  /* width: 400px; */
  /* height: 50px; */

  margin-top: 0.625rem;

  line-height: 3.125rem;
}

.icon-input input {

  width: 65%;
  margin-right: 0.3125rem;
}

.icon-input::after {

  content: '\e605';
  /* 你从 iconfont 上复制的编码 */
  font-family: 'iconfont';
  /* 通常是 iconfont，而不是 icon-chongwu */
  position: absolute;
  left: 8.125rem;
  top: 1.625rem;
  transform: translateY(-50%);
  font-size: 1.4375rem;
  color: #330fe5;
}

.btn {

  width: 30%;
  border-radius: 0.625rem;
  font-size: 1.125rem;
  border: 0.5px solid #330fe5;
  background-color: #fff;
  color: #330fe5;
  font-weight: 700;

}

.middle {
  margin-bottom: 1.25rem;
}

textarea {
  border-radius: 0.625rem;

  height: 5.9375rem;
  padding-top: 0.625rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding-left: 0.625rem;

}

input[type='file'] {
  margin-bottom: 1.25rem;
}

button {
  border-radius: 0.625rem;
  font-size: 1.125rem;
  border: 0.0313rem solid #330fe5;
  background-color: #fff;
  color: #330fe5;
  font-weight: 700;
  padding: 0.4375rem 0.4375rem;
}
</style>