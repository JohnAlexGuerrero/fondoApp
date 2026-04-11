export interface Prestamo {
    id: number;
    amount: number;
    status: string;
    interes?: number;
    months?: number;
    created_at: Date;
}
