import clone from "@/lib/clone";
const localStorageKeyName = 'recodeList';

const recodeStore = {
    //recode store
    recodeList : [] as RecodeItem[],
    fetchRecodes(){
        this.recodeList = JSON.parse(localStorage.getItem(localStorageKeyName)||'[]') as RecodeItem[];
        return this.recodeList;
    },
    saveRecodes(){
        localStorage.setItem(localStorageKeyName,JSON.stringify(this.recodeList))
    },
    createRecode(recode: RecodeItem) {
        //深拷贝以后再push 到数组中，否则，
        // recode每改变一次，loacalstorage中存着的recode都会改变，因为recode是地址，该地址里面变量值变了，所有引用这个对象的值都变了
        const recode2: RecodeItem = clone(recode);
        recode2.createAt = new Date().toISOString();
        this.recodeList?.push(recode2); //问号表示可能为undefined,不为undefined才push,可选链新语法
        recodeStore.saveRecodes();
    },
}
recodeStore.fetchRecodes();

export default recodeStore;
