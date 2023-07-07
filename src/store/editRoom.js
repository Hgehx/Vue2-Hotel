const editRoomModule = {
  namespaced: true, // 添加命名空间设置
  state: {
    aroom_id: 1, //客房指定id
    aroom_total: 1, //客房数量
    aroom_edit: '', //客房操作：新增 || 编辑
    aroom_mid: 1, // 两表对应room_id
    uroom_info: {} //用户点击预约获取对应客房数据
  },
  mutations: {
    // 客房数量
    aroomTotal(state, payload) {
      state.aroom_total = payload
    },
    // 编辑指定id
    aroomId(state, payload) {
      state.aroom_id = payload
    },
    // 管理员编辑
    aroomEdit(state, payload) {
      state.aroom_edit = payload
    },
    // 两表对应room_id
    aroomMid(state, payload) {
      state.aroom_mid = payload
    },
    // 用户点击预约获取对应客房数据
    uroomInfo(state, payload) {
      state.uroom_info = payload
    }
  },
  actions: {}
}

export default editRoomModule
