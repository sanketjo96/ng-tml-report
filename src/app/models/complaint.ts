import { UtilService } from '../core/util/util.service';

export interface ComplaintFinder {
    complaintGroupCode: string,
    models?: Array<string>;
    from?: Date;
    to?: Date;
    mis?: number
}

export class Complaint {
    _id: string;
    Dealer_Code: string;
    Dealer_Name: string;
    Dealer_City: string;
    PCR_Number: string;
    VC_Number: string;
    VC_Description: string;
    Model: string;
    Sub_Model: string;
    Chassis_No: string;
    Chassis_Type: string;
    Production_Month: string;
    Kilometers_Covered: string;
    Complaint_Group: string;
    Complaint_Group_Description: string;
    Complaint_Code: string;
    Complaint_Code_Description: string;
    Sale_Month: string;
    Complaint_Month: string;
    mis: string;
    No_of_Complaints: number;
    Total_Expenses: number;
    Customer_Complaint: string;
    Investigation: string;
    Action_Taken: string

    constructor(data: any, util: UtilService) {
        this._id  = data._id;
        this.Dealer_Code = data.Dealer_Code;
        this.Dealer_Name = data.Dealer_Code_Description;
        this.Dealer_City = data.Dealer_City;
        this.PCR_Number = data.PCR_Number;
        this.VC_Number = data.VC_Number;
        this.VC_Description = data.VC_Description;
        this.Model = data.Model;
        this.Sub_Model = data.Sub_Model;
        this.Chassis_No = data.Chassis_No;
        this.Chassis_Type = data.Chassis_Type;
        this.Production_Month = data.Production_Month;
        this.Kilometers_Covered = data.Kilometers_Covered;
        this.Complaint_Group = data.Complaint_Group;
        this.Complaint_Group_Description = data.Complaint_Group_Description;
        this.Complaint_Code = data.Complaint_Code;
        this.Complaint_Code_Description = data.Complaint_Code_Description;
        this.Sale_Month = data.Sale_Month;
        this.Complaint_Month = util.getTMLDateFormat(new Date(data.Complaint_Month));
        this.mis = data.Diff_between_Complaint_Sales_Month;
        this.No_of_Complaints = parseInt(data.No_of_Complaints, 10) ? parseInt(data.No_of_Complaints, 10) : 0;
        this.Total_Expenses = parseInt(data.Total_Expenses, 10) ? parseInt(data.Total_Expenses, 10) : 0;
        this.Customer_Complaint = data.Customer_Complaint;
        this.Investigation = data.Investigation;
        this.Action_Taken  = data.Action_Taken;
    }
}

export class ComplainList {
    list: Array<Complaint> = [];

    constructor(data, util: UtilService) {
        for (let i=0; i<data.length; i++) {
            this.list.push(new Complaint(data[i], util));
        }
    }
}