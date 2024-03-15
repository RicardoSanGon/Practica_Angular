export interface Detalle {
  id: number;
  orden_id: number;
  modelo: string;
  cantidad: number;
  precio_total: number;
  fecha_de_entrega: string;
  cliente: string;
  status: string;
}
