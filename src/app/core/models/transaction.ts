
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type?: string;
    status?: string;
    created_at: string;
}
