export interface IGroup {
        group_id: string;
        title: string;
        description: string;
        creation_date: Date;
        numberparticipants: number;
        total_amount?: number; 
        gastos?: string[]; 
        participants: string[];
}

