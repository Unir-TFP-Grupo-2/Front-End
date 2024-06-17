export interface IExpense {
    expense_id: string;
    user_id_gasto: string;
    description: string;
    amount: number;
    participants: string[];
    group_id: number; 
}