const localStorageKeyNanme = 'recodeList';
const model = {
    fetch(){
        return JSON.parse(localStorage.getItem(localStorageKeyNanme)||'[]');
    },
    save(data){
        localStorage.setItem(localStorageKeyNanme,JSON.stringify(data))
    }

}
export default model;