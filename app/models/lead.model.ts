export interface ILead {
    id: number;
    priority: number;
    company_name: string;
    person_responsible?: string;
    status: string;
}

export class Lead implements ILead {
    id: number;
    priority: number;
    company_name: string;
    person_responsible: string;
    status: string;

    constructor(lead: any) {
        this.id = lead.id;
        this.priority = lead.priority;
        this.company_name = lead.company_name;
        this.person_responsible = lead.person_responsible;
        this.status = lead.status;
    }

}
