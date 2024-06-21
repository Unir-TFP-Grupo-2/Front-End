export interface IGroup {
        group_id: string;
        title: string;
        description: string;
        creation_date: Date;
        num_participants?: number;
        total_amount?: number; 
        balance_difference?: number;
        gastos?: string[]; 
        participants: string[];
        creator_id?: string
}

