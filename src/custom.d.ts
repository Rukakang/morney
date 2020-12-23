type RecodeItem ={
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createaAt?: Date;
};

type Tag = {id: string;name: string};
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success'|'duplicated';
    update: (id: string,name: string) => 'success'|'not found'|'duplicated';
    remove: (id: string) => boolean;
    save: () => void;
};

interface Window{
    store: {
        findTag: (id: string) => Tag;
        tagList: Tag[];
        createTag: (name: string) => void;
        removeTag: (id: string) => boolean;
        updateTag: TagListModel['update'];//意思是和TagListModel里的update返回值一致

        recodeList: RecodeItem[];
        createRecode: (recode: RecodeItem) => void;
    };
}

