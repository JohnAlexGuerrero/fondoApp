
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type?: string;
    status?: string;
    isActive?: boolean;
    created_at: string;
}
