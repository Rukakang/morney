import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex)



const store = new Vuex.Store({
  state: {
    recodeList:[] ,
    createRecodeError:null,
    tagList :[],
    currentTag: undefined,
  } as RootState,

  //store的mutations所有操作不会有返回值,直接体现在state更新数据上
  mutations: {
    fetchRecodes(state){
      //JSON.parse是JSON序列化字符串,JSON不支持data类型,可以查阅JSON官方中文文档看所支持的类型
      state.recodeList = JSON.parse(localStorage.getItem('recodeList')||'[]') as RecodeItem[];
    },
    createRecode(state,recode: RecodeItem) {
      //深拷贝以后再push 到数组中，否则，
      // recode每改变一次，loacalstorage中存着的recode都会改变，因为recode是地址，该地址里面变量值变了，所有引用这个对象的值都变了
      const recode2: RecodeItem = clone(recode);
      recode2.createAt =recode2.createAt||new Date().toISOString();
      state.recodeList?.push(recode2); //问号表示可能为undefined,不为undefined才push,可选链新语法
      store.commit('saveRecodes');
    },
    saveRecodes(state){
      localStorage.setItem('recodeList',JSON.stringify(state.recodeList))
    },
    fetchTags(state){
      state.tagList = JSON.parse(localStorage.getItem('tagList')||'[]');
    },
    createTag(state,name: string){
      const names = state.tagList.map(item=>item.name);
      if(names.indexOf(name)>=0){
        window.alert('标签名重复了');
      }else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        store.commit('saveTags');
        window.alert('添加成功');
      }

    },
    saveTags(state){
      localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
    setCurrentTag(state,id: string){
      state.currentTag = state.tagList.filter(t=> t.id ===id)[0];
    },
    removeTag(state,id: string){
      let index = -1;
      for(let i =0; i< state.tagList.length; i++){
        if (state.tagList[i].id === id){
          index = i;
          break;
        }
      }
      if(index>=0){
        state.tagList.splice(index,1);
        store.commit('saveTags');
        router.back();
      }else{
        window.alert('删除失败');
      }
    },
    updateTag(state,payload: {id: string;name: string}){
      const {id,name}=payload;   //析构语法,等价于 const id = payload.id 和 const name =payload.name两句
      const idList = state.tagList.map(item=>item.id);
      if(idList.indexOf(id)>=0){
        const names = state.tagList.map(item=>item.name);
        if(!name|| !/[^\s]/.test(name)){
          window.alert("标签名不能为空");
        }else if (names.indexOf(name)>=0){
         window.alert("标签名重复了");
        }else{
          console.log(state.tagList);
          const tag =state.tagList.filter(item=>item.id===id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store;
