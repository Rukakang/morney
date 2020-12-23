import tagListModel from "@/models/tagListModel";

export default {
    //tag store
    tagList : tagListModel.fetch(),
    findTag(id: string){
        return this.tagList.filter(t=>t.id===id)[0];
    },
    createTag :(name: string)=>{
        const message = tagListModel.create(name);
        if (name === ''){
            window.alert('标签名不能为空');
        }else {
            window.alert('添加成功');
        }
    },
    removeTag:(id: string)=>{
        return tagListModel.remove(id);
    },
    updateTag: (id: string,name: string)=>{
        return tagListModel.update(id,name);
    },
}