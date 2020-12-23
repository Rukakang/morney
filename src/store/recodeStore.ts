import recodeListModel from "@/models/recodeListModel";

export default {
    //recode store
    recodeList : recodeListModel.fetch(),
    createRecode : (recode: RecodeItem)=>{recodeListModel.create(recode)},

}