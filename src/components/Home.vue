<template>
  <el-container class="home-container">
    <el-header>
      <div class="">
        <img src="../assets/logo.png" alt="MarsForest" />
        <span>火星森林博客</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <div class="home_fold">
          <i class="el-icon-edit" @click="toggleCollapse"></i>
        </div>
        <el-menu
          background-color="#b3c0d1"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :unique-opened="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id+''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本  -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单  -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus:
        'https://www.fastmock.site/mock/26435024ab33e0f4374c1f13944a8064/in/menus',
      //左侧菜单数据
      menulist: [],
      isCollapse: false,
      //被激活的链接地址
      activePath:''
    }
  },
  created() {
    this.getMenuList()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get(this.menus)
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.menulist = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath){
      // window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.home_fold {
  text-align: right;
  height: 40px;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
}
.home_fold> i{
  padding-right: 15px;
}
.el-button {
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  font-size: 20px;
}
.el-header > div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 30%;
}
.el-header > div > img {
  width: 10%;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: right; */
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>