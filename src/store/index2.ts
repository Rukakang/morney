import recodeListModel from "@/models/recodeListModel";
import tagListModel from "@/models/tagListModel";
import recodeStore from "@/store/recodeStore";
import tagStore from "@/store/tagStore";

const store ={
    ...recodeStore,
    ...tagStore
}
export default store;