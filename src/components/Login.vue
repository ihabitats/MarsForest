<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="userlogo" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        :rules="loginFormRules"
        class="login_form"
      >
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            suffix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            suffix-icon="el-icon-more"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      logins:
        'https://www.fastmock.site/mock/26435024ab33e0f4374c1f13944a8064/in/login',
      //登陆表单的数据绑定对象
      loginForm: {
        phone: '',
        password: '',
      },
      //表单验证规则对象
      loginFormRules: {
        //验证手机号是否合法
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号是十一位', trigger: 'blur' },
        ],
        //密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码在三到十六位之间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(this.logins, this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        //将登录成功之后的token,保存道客户端sessionStorage中
        //项目中出了登陆之外的其他API接口,必须在登录之后才能访问
        //token 只应在当前网站打开期间生效，所以将token 保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航跳转到后台主页,路由地址是 /home
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style  scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: space-around;
}
</style>