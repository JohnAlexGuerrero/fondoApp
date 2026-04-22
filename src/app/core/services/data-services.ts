import { Injectable } from '@angular/core';
import { SupabaseServices } from './supabase-services';



@Injectable({
  providedIn: 'root',
})
export class DataServices {


  constructor(
    private supabaseServices: SupabaseServices
  ) {}

  /* 
    suma total de aportes realizados para el fondo X
  */
  async summaryTotalAportesPorFondo(fondoId: number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
      .rpc('sum_total_aportes_by_fondo', {
        p_fondo_id: fondoId
      });

      if (error) alert(error.message)

      return data;
    }catch  (error) {
      console.log(error);
    }
  }

  /**
   * Saldo de prestamos vigentes en el fondo
   */
  async saldoPrestamoPorFondo(id: number): Promise<any> {
    try {
      let {data, error} = await this.supabaseServices.supabase
      .rpc('saldo_prestamos_por_fondo', {
        p_fondo_id:id
      })

      if (error) {
        alert(error.message);
      }

      return data;
    } catch (error) {
      console.log(error);
    }

  }

  // total eventos por fondo
  async sumaTotalEventosPorFondo(id: number): Promise<any> {
    try {
      let {data, error} = await this.supabaseServices.supabase
      .rpc('sum_total_eventos_por_fondo', {
        p_fondo_id:id
      })

      if (error) {
        alert(error.message);
      }

      return data;
      
    } catch (error) {
      console.log(error);
    }
  }

  async listAportesPorFondo(fondoId: number): Promise<any> {
    try {
      const { data, error } = await this.supabaseServices.supabase
        .from('aporte')
        .select('id, description, amount, created_at')
        .eq('fondo_id', fondoId)
        .order('created_at', { ascending: false })
        // .range(0,20)
        ;

        if (error) {
          alert('Error al obtener los aportes: ' + error.message);
        }
        
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  async filterAportesPorFondo(fondoId: number): Promise<any> {
    try {
      const { data, error } = await this.supabaseServices.supabase
        .from('transaction')
        .select('id, description, amount, type, created_at')
        .eq('fondo_id', fondoId)
        .like('description', '%Aporte%')
        .order('created_at', { ascending: false })
        // .range(0,10)
        ;

        if (error) {
          alert('Error al obtener los aportes: ' + error.message);
        }
        
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  async filterEventosPorFondo(fondoId: number): Promise<any> {
    try {
      const { data, error } = await this.supabaseServices.supabase
        .from('transaction')
        .select('id, description, amount, type, created_at')
        .eq('fondo_id', fondoId)
        .like('description', '%Evento%')
        .order('created_at', { ascending: false })
        // .range(0,10)
        ;

        if (error) {
          alert('Error al obtener los aportes: ' + error.message);
        }
        
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  async filterPrestamosPorFondo(fondoId: number): Promise<any> {
    try {
      const { data, error } = await this.supabaseServices.supabase
        .from('transaction')
        .select('id, description, amount, type, created_at')
        .eq('fondo_id', fondoId)
        .like('description', '%Prestamo%')
        .order('created_at', { ascending: false })
        // .range(0,10)
        ;

        if (error) {
          alert('Error al obtener los aportes: ' + error.message);
        }
        
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  async filterGastosPorFondo(fondoId: number): Promise<any> {
    try {
      const { data, error } = await this.supabaseServices.supabase
        .from('transaction')
        .select('id, description, amount, type, created_at')
        .eq('fondo_id', fondoId)
        .like('description', '%Gastos%')
        .order('created_at', { ascending: true })
        // .range(0,10)
        ;

        if (error) {
          alert('Error al obtener los aportes: ' + error.message);
        }
        
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  async transactionsAll(fondoId: number): Promise<any> {
    try {   
      let { data: transaction, error } = await this.supabaseServices.supabase
      .from('transaction')
      .select('id, description, amount, type, created_at')
      .eq('fondo_id', fondoId)
      .order('created_at', { ascending: true })
      .range(0,20);

      if (error) {
        alert(error.message);
      }

      return transaction;

    } catch (error) {
      console.log(error);
    }
  }

  async fondoInfo(fondoId: number): Promise<any> {
    try {
      let { data: fondo, error } = await this.supabaseServices.supabase
        .from('fondo')
        .select('names')
        .eq('id', fondoId)

        if (error) {
          alert(error.message);
        }
        // console.log(fondo);
        return fondo;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   * @param fondoId 
   * @returns 
   */
  async miembrosPorFondo(fondoId: number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('aportes_por_miembro', {
          p_fondo_id:fondoId
        })
        .order('created_at', {ascending: false})

        if (error) {
          alert(error.message);
        }
        // console.log(data);
        return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Información filtrada por cada uno de los miembros
   */
  /**
   * suma total de aportes
   * @param userId 
   * @param fondoId 
   * @returns 
   */
  async saldosAportesPorMiembro(userId: number, fondoId:number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_sum_total_aportes', {
          p_fondo_id:fondoId, 
          p_miembro_id:userId
        })

      if (error) alert(error.message)
      //else console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * saldo prestamos por miembro
   */
  async saldoPrestamoPorMiembro(userId:number, fondoId:number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_saldo_prestamos_por_miembro', {
          p_fondo_id:fondoId, 
          p_miembro_id:userId
        })
      if (error) alert(error.message)
      //else console.log(data)
      
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  Calculo de intereses
   */
  async saldoInteresesPorMiembro(userId: number, fondoId: number, date:Date): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_saldo_intereses_por_miembro', {
          date:date, 
          p_fondo_id: fondoId, 
          p_miembro_id: userId
        })
      if (error) alert(error.message)
      //else console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * saldo pendientes por pagar
   */

  async saldoPendientePorMiembro(userId:number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_saldo_pendiente_por_pagar', {
          p_miembro_id:userId
        })
      if (error) alert(error)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * total eventos ganancias
   */
  async totalGananciasPorMiembro(fondoId: number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_total_ganancias_por_miembro', {
          p_fondo_id:fondoId 
        })

      if (error) alert(error)
      else console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // total gastos por fondo
  async totalGastosPorFondo(fondoId: number): Promise<any> {
    try {      
      let { data, error } = await this.supabaseServices.supabase
        .rpc('fn_total_gastos_por_fondo', {
          p_fondo_id: fondoId
        })

      if (error) alert(error.message)
      else console.log(data)

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  // aportes por fondo y miembro
  async aportesPorFondo(fondoId: number, miembroId: number): Promise<any> {
    try {
      let { data: aporte, error } = await this.supabaseServices.supabase
        .from('aporte')
        .select('id, description, miembro_id, amount, status, created_at')
        .eq('fondo_id', fondoId)
        .eq('miembro_id', miembroId)

      if (error) alert(error.message);
      // console.log(aporte)

      return aporte?.length;

    } catch (error) {
      console.log(error);
    }
  }

  // informacion de miembro
  async infoMiembro(miembroId: number, fondoId: number): Promise<any> {
    try {
      let { data: miembro, error } = await this.supabaseServices.supabase
        .rpc('fn_info_miembro_por_fondo', {
          p_fondo_id:fondoId, 
          p_miembro_id: miembroId
        })

      if(error) alert(error.message)
      // else console.log(miembro)

      return miembro;

    } catch (error) {
      console.log(error);
    }
  }

  // consulta de los prestamos por miembro
  async getPrestamoPorMiembro(miembroId: number, fondoId: number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
        .from('prestamo')
        .select('id, amount, status, created_at')
        .eq('miembro_id', miembroId)
        .eq('fondo_id', fondoId)
        .order('created_at', { ascending: true })

        if (error) alert(error.message)
        else console.log(data)

        return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Consulta de transacciones hechas por un miembro especifico organizadas por fecha
  async transaccionesPorMiembro(miembroId: number, fondoId: number): Promise<any> {
    try {
      let { data, error } = await this.supabaseServices.supabase
      .rpc('fn_transactions_by_member', {
        p_fondo_id: fondoId, 
        p_miembro_id: miembroId
      })
  
      if (error) alert(error.message)
      else console.log(data)
  
      return data;
  
    } catch (error) {
      console.log(error);
    }
  }
}



