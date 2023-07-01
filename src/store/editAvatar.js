const editAvatar = {
  namespaced: true, // 添加命名空间设置
  state: {
    adminAvatar: 'https://s1.ax1x.com/2023/06/30/pCBFz6J.png' //默认头像
  },
  mutations: {
    // 获取头像
    adminAvatar(state, photo) {
      if (photo) {
        state.adminAvatar = photo
      }
    }
  },
  actions: {
    // 登录之后判断是否有token值，如果没有token值，设置成默认头像
    //如果不判断的话，在我们登录状态下，删除数据库当中的avatar，用户退出再次登录，state还是保存之前的侯祥
    isToken(context) {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        context.commit(
          'adminAvatar',
          'https://s1.ax1x.com/2023/06/30/pCBFz6J.png'
        )
      }
    }
  }
}

export default editAvatar
