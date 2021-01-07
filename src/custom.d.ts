type RootState ={
    recodeList: RecodeItem[];
    createRecodeError: Error|null;
    tagList: Tag[];
    currentTag?: Tag; //问号表示可以没有
};

type RecodeItem ={
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createAt?: string;
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

