import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recodeList:[] as RecodeItem[]
  },

  mutations: {
    fetchRecodes(state){
      return state.recodeList = JSON.parse(localStorage.getItem('recodeList')||'[]') as RecodeItem[];
    },
    createRecode(state,recode: RecodeItem) {
      //深拷贝以后再push 到数组中，否则，
      // recode每改变一次，loacalstorage中存着的recode都会改变，因为recode是地址，该地址里面变量值变了，所有引用这个对象的值都变了
      const recode2: RecodeItem = clone(recode);
      recode2.createaAt = new Date();
      state.recodeList?.push(recode2); //问号表示可能为undefined,不为undefined才push,可选链新语法
      store.commit('saveRecodes');
    },
    saveRecodes(state){
      localStorage.setItem('recodeList',JSON.stringify(state.recodeList))
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store;
