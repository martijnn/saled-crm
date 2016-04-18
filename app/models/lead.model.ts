export interface ILead {
    id: number;
    priority: number;
    company_name: string;
    person_responsible?: string;
    status: LeadStatus;
}

export enum LeadStatus {
    Open = <any>"Open",
    Onderhanden = <any>"Onderhanden",
    Gesloten = <any>"Gesloten"
}

export class Lead implements ILead {
    id: number;
    priority: number;
    company_name: string;
    person_responsible: string;
    status: LeadStatus;

    constructor(lead: any) {
        this.id = lead.id;
        this.priority = lead.priority;
        this.company_name = lead.company_name;
        this.person_responsible = lead.person_responsible;
        this.status = lead.status;
    }

}
