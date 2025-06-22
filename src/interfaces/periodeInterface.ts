export interface ApiResponse<T> {
   status: "success" | "error";
   data: T | null;
   meta: any | null;
   error: {
      message: string;
      code: number;
   } | null;
}

export interface JwtPayloadToken {
   userId: number;
   role: string;
}

export interface PeriodeDTO {
   nama_periode: string;
   waktu_mulai: string;
   waktu_selesai: string;
}

export interface PeriodeResponseDTO extends PeriodeDTO{
   periode_id: number
}

export interface PeriodeJalurDTO extends Omit<PeriodeDTO, "nama_periode"> {
   periode_id: number;
   jalur_id: number;
   metode_ranking: "JARAK_LURUS" | "JARAK_RUTE" | null;
}

export interface GetAllPeriodeJalurResponse extends PeriodeJalurDTO {
   periode_jalur_id: number
   jalur_nama: string
}

export interface GetAllJadwalResponse extends Omit<GetAllPeriodeJalurResponse, "jalur_id" | "periode_id" | "jalur_nama" | "metode_ranking">  {
   tahapan_id: number
   tahapan_nama: string
   is_closed: number
   jadwal_id: number
}

export interface PeriodeJalurRequest extends Omit<GetAllPeriodeJalurResponse, "periode_id" | "periode_jalur_id"> {}

export interface JadwalRequest extends Omit<GetAllJadwalResponse, "is_closed" | "jadwal_id" | "tahapan_nama"> {
   tahapan_id: number
}

export interface JalurDTO {
   jalur_id: number
   nama_jalur: string
}

export interface PaginationMeta {
   total: number;
   page: number;
   limit: number;
}

