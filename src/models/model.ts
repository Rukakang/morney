const localStorageKeyName = 'recodeList';
const model = {
    data:[] as RecodeItem[],
    clone(data: RecodeItem[]|RecodeItem){
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        this.data = JSON.parse(localStorage.getItem(localStorageKeyName)||'[]') as RecodeItem[];
        return this.data;
    },
    save(){
        localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }

}
export default model;
