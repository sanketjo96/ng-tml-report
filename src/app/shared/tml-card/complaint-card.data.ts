export interface IsectionFeild {
    name: string;
    value: string;
}

export interface IComplaintCard {
    header: string;
    sections: Array<Array<IsectionFeild>>;
    additionalSection: Array<IsectionFeild>;
}