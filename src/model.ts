const localStorageKeyNanme = 'recodeList';
const model = {
    colone(data: RecodeItem[]|RecodeItem){
        JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse(localStorage.getItem(localStorageKeyNanme)||'[]') as RecodeItem[];

    },
    save(data: RecodeItem[]){
        localStorage.setItem(localStorageKeyNanme,JSON.stringify(data))
    }

}
export default model;
