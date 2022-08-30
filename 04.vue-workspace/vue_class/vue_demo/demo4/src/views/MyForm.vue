<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="8">
      <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px">
        <el-form-item>
          <el-row type="flex" justify="center">
            <h2>欢迎来到欢迎界面</h2>
          </el-row>
        </el-form-item>
        <el-form-item  label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-radio-group v-model="ruleForm.role">
            <el-radio label="系统管理员"></el-radio>
            <el-radio label="宿舍管理员"></el-radio>
            <el-radio label="学生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "MyForm",
  data() {
    return {
      labelPosition: 'left',
      ruleForm: {
        account:'',
        pwd: '',
        role: '',
      },
      rules: {
        account:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:6,max:12,message: '长度在6至12之间',trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 6 到 10 个字符', trigger: 'blur'},
        ],
        role: [
          {required: true, message: '请选择登录角色', trigger: 'change'},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.demo-ruleForm{
  background-color: #9acfea;
  padding: 20px;
}
</style>