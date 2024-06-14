export interface IExpense {
    expense_id: number;
    user_id_gasto: string;
    description: string;
    amount: number;
    participants: string[];
    group_id: number; 
}