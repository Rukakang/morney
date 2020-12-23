import clone from "@/lib/clone";

const localStorageKeyName = 'recodeList';
const recodeListModel = {
    data:[] as RecodeItem[],//断言类型
    create(recode: RecodeItem) {
        //深拷贝以后再push 到数组中，否则，
        // recode每改变一次，loacalstorage中存着的recode都会改变，因为recode是地址，该地址里面变量值变了，所有引用这个对象的值都变了
        const recode2: RecodeItem = clone(recode);
        recode2.createaAt = new Date();
        this.data.push(recode2);
    },
    fetch(){
        this.data = JSON.parse(localStorage.getItem(localStorageKeyName)||'[]') as RecodeItem[];
        return this.data;
    },
    save(){
        localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }

}
export default recodeListModel;
