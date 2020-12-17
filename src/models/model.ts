const localStorageKeyName = 'recodeList';
const model = {
    clone(data: RecodeItem[]|RecodeItem){
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse(localStorage.getItem(localStorageKeyName)||'[]') as RecodeItem[];

    },
    save(data: RecodeItem[]){
        localStorage.setItem(localStorageKeyName,JSON.stringify(data))
    }

}
export default model;
