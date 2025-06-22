import { PeriodeRepository } from "../repositories/periodeRepository";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import {
   GetAllJadwalResponse,
   GetAllPeriodeJalurResponse,
   PeriodeJalurDTO,
   PeriodeResponseDTO,
} from "../interfaces/periodeInterface";
import { logger } from "../utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "winston";

interface Periode {
   periode_id: number;
   nama: string;
   waktu_mulai: Date | null;
   waktu_selesai: Date | null;
}

export class PeriodeService {
   static async createPeriode(
      namaPeriode: string,
      waktu_mulai: string,
      waktu_selesai: string
   ): Promise<PeriodeResponseDTO> {
      const created_at = new Date().toISOString();
      const newPeriode = await PeriodeRepository.createPeriode(
         namaPeriode,
         waktu_mulai,
         waktu_selesai,
         created_at
      );
      const response: PeriodeResponseDTO = {
         periode_id: newPeriode.periode_id,
         nama_periode: newPeriode.nama,
         waktu_mulai: new Date(newPeriode.waktu_mulai!).toISOString(),
         waktu_selesai: new Date(newPeriode.waktu_selesai!).toISOString(),
      };
      return response;
   }

   static async getAllPeriode(
      page: number,
      limit: number
   ): Promise<{ response: PeriodeResponseDTO[]; total: number }> {
      const skip = (page - 1) * limit;
      const periode = await PeriodeRepository.findAllPeriode(skip, limit);
      const response = periode.map((p) => ({
         periode_id: p.periode_id,
         nama_periode: p.nama,
         waktu_mulai: p.waktu_mulai!.toISOString(),
         waktu_selesai: p.waktu_selesai!.toISOString(),
      }));
      const total = await PeriodeRepository.countAllPeriode();
      return { response, total };
   }

   static async updatePeriodeById(
      periodeId: number,
      newNamaPeriode: string,
      waktu_mulai: string,
      waktu_selesai: string
   ): Promise<PeriodeResponseDTO> {
      const updatedAt = new Date().toISOString();

      const periodeJalurList = await PeriodeRepository.findAllPeriodeJalurByPeriodeId(periodeId)
      if (periodeJalurList.length > 0) {
         for (const pj of periodeJalurList) {
            if (pj.waktu_mulai && pj.waktu_selesai) {
               this.checkTimesIsWithinRange
               (
                  new Date(waktu_mulai), 
                  new Date(waktu_selesai),
                  pj.waktu_mulai,
                  pj.waktu_selesai,
                  'periode',
                  pj.jalur.jalur_nama
               )
            }
         }
      }

      const periode = await PeriodeRepository.updatePeriodeById(
         periodeId,
         newNamaPeriode,
         waktu_mulai,
         waktu_selesai,
         updatedAt
      );

      const response: PeriodeResponseDTO = {
         periode_id: periode.periode_id,
         nama_periode: periode.nama,
         waktu_mulai: periode.waktu_mulai!.toISOString(),
         waktu_selesai: periode.waktu_selesai!.toISOString(),
      };
      return response;
   }

   static async deletePeriodeById(periodeId: number): Promise<{
      periode_id: number;
   }> {
      return await PeriodeRepository.deletePeriodeById(periodeId);
   }

   private static checkTimesIsWithinRange (
      waktu_mulai: Date,
      waktu_selesai: Date,
      waktu_mulai_child: Date,
      waktu_selesai_child: Date,
      type: 'periode' | 'periodeJalur',
      nama: string
   ) {
      const typeOnMsg = type === 'periode' ? 'Periode Jalur' : 'Jadwal'
      const typeOnMsg2 = type === 'periode' ? 'Periode' : 'Periode Jalur'
      const messageWaktuMulai = `Waktu mulai ${typeOnMsg} ${nama} lebih akhir dari ${typeOnMsg2}`
      const messageWaktuSelesai = `Waktu selesai ${typeOnMsg} ${nama} lebih akhir dari ${typeOnMsg2}`
      if (waktu_mulai > waktu_mulai_child) {
         throw new AppError
         (
            messageWaktuMulai, 
            400
         )
      } else if (waktu_selesai < waktu_selesai_child) {
         throw new AppError
         (
            messageWaktuSelesai, 
            400
         )
      }
   }

   // tahapan
   static async createTahapan(namaTahapan: string): Promise<{
      tahapan_id: number;
   }> {
      const create_at = new Date().toISOString();
      return await PeriodeRepository.createTahapan(namaTahapan, create_at);
   }
   static async updateTahapanById(
      tahapanId: number,
      tahapanNama: string
   ): Promise<{
      tahapan_id: number;
   }> {
      return await PeriodeRepository.updateTahapanById(tahapanId, tahapanNama);
   }
   static async getAllTahapan(): Promise<
      {
         tahapan_id: number;
         tahapan_nama: string;
      }[]
   > {
      return await PeriodeRepository.findAllTahapan();
   }
   static async deleteTahapanById(tahapanId: number): Promise<{
      tahapan_id: number;
   }> {
      return await PeriodeRepository.deleteTahapanById(tahapanId);
   }

   // jalur
   static async createJalur(namaJalur: string): Promise<{
      jalur_id: number;
   }> {
      const created_at = new Date().toISOString();
      return await PeriodeRepository.createJalur(namaJalur, created_at);
   }

   static async getAllJalur() {
      return await PeriodeRepository.findAllJalur();
   }

   static async updateJalurById(
      jalurId: number,
      namaJalur: string
   ): Promise<{
      jalur_id: number;
   }> {
      const updated_at = new Date().toISOString();
      return await PeriodeRepository.updateJalurById(
         jalurId,
         namaJalur,
         updated_at
      );
   }

   static async deleteJalurById(jalurId: number): Promise<{
      jalur_id: number;
   }> {
      return await PeriodeRepository.deleteJalurById(jalurId);
   }

   // periode jalur
   static async createPeriodeJalur(
      periodeId: number,
      jalurId: number,
      waktu_mulai: string,
      waktu_selesai: string,
      metode_ranking: "JARAK_LURUS" | "JARAK_RUTE" | null
   ): Promise<GetAllPeriodeJalurResponse> {
      try {
         // Timestamp sekarang
         const created_at = new Date().toISOString();
         // Ambil data periode dari repository
         const periode = await PeriodeRepository.findPeriodeById(periodeId);
         if (!periode) {
            throw new AppError(`Periode with id ${periodeId} not found`, 404);
         }

         await this.checkPeriodTimesRange
         (
            periode, 
            new Date(waktu_mulai), 
            new Date(waktu_selesai)
         )

         // Jika valid, buat data menggunakan Prisma
         const response = await PeriodeRepository.createPeriodeJalur(
            periodeId,
            jalurId,
            waktu_mulai,
            waktu_selesai,
            metode_ranking,
            created_at
         );
         const newPeriodeJalur: GetAllPeriodeJalurResponse = {
            periode_jalur_id: response.periode_jalur_id,
            periode_id: response.periode_id,
            jalur_id: response.jalur_id,
            jalur_nama: response.jalur.jalur_nama,
            waktu_mulai: response.waktu_mulai
               ? response.waktu_mulai.toISOString()
               : "",
            waktu_selesai: response.waktu_selesai
               ? response.waktu_selesai.toISOString()
               : "",
            metode_ranking: response.metode_ranking ?? null
         };

         // Return hasil
         return newPeriodeJalur;
      } catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
               throw new AppError("periode dan jalur sudah ada", 400);
            }
         }
         throw error;
      }
   }

   static async getAllPeriodeJalurByPeriodeId(
      periodeId: number
   ): Promise<GetAllPeriodeJalurResponse[]> {
      const periodeJalurs =
         await PeriodeRepository.findAllPeriodeJalurByPeriodeId(periodeId);
      const response: GetAllPeriodeJalurResponse[] = periodeJalurs.map(
         (periodeJalur) => ({
            periode_jalur_id: periodeJalur.periode_jalur_id,
            periode_id: periodeJalur.periode_id,
            jalur_id: periodeJalur.jalur_id,
            jalur_nama: periodeJalur.jalur.jalur_nama,
            waktu_mulai: new Date(periodeJalur.waktu_mulai!).toISOString(),
            waktu_selesai: new Date(periodeJalur.waktu_selesai!).toISOString(),
            metode_ranking: periodeJalur.metode_ranking ?? null
         })
      );

      return response;
   }

   static async getPeriodeJalurById(
      periodeJalurId: number
   ): Promise<PeriodeJalurDTO> {
      const periodeJalur = await PeriodeRepository.findPeriodeJalurById(
         periodeJalurId
      );
      if (!periodeJalur) {
         throw new AppError("Periode Jalur not found", 404);
      }
      const response: PeriodeJalurDTO = {
         periode_id: periodeJalur.periode.periode_id,
         jalur_id: periodeJalur.jalur_id,
         waktu_mulai: new Date(periodeJalur.waktu_mulai!).toISOString(),
         waktu_selesai: new Date(periodeJalur.waktu_selesai!).toISOString(),
         metode_ranking: periodeJalur.metode_ranking ?? null
      };
      return response;
   }

   static async updatePeriodeJalurById(
      periodeJalurId: number,
      jalurId: number,
      waktu_mulai: string,
      waktu_selesai: string,
      metode_ranking: "JARAK_LURUS" | "JARAK_RUTE" | null
   ): Promise<GetAllPeriodeJalurResponse> {
      const updated_at = new Date().toISOString();

      const periodeJalur = await PeriodeRepository.findPeriodeJalurById(periodeJalurId)
      console.log(periodeJalur)
      if (!periodeJalur) {
         throw new AppError("Periode Jalur not found", 404)
      }

      // console.log("dijalankan setelah periodeJalur")

      await this.checkPeriodTimesRange
      (
         periodeJalur.periode,
         new Date(waktu_mulai),
         new Date(waktu_selesai)
      )

      // console.log("dijalankan setelah cek periode")

      const jadwals = await PeriodeRepository.findAllJadwalByPeriodeJalurId(periodeJalurId)
      console.log(jadwals)
      
      if (jadwals.length > 0) {
         for (const j of jadwals) {
            if (j.waktu_mulai && j.waktu_selesai) {
               this.checkTimesIsWithinRange
               (
                  new Date(waktu_mulai),
                  new Date(waktu_selesai),
                  j.waktu_mulai,
                  j.waktu_selesai,
                  'periodeJalur',
                  j.tahapan.tahapan_nama
               )
            }
         }
      }

      // console.log("dijalankan setelah pengecekan")
      try {
         const response = await PeriodeRepository.updatePeriodeJalurById(
            periodeJalurId,
            jalurId,
            waktu_mulai,
            waktu_selesai,
            metode_ranking,
            updated_at
         );

         const editedPeriodeJalur: GetAllPeriodeJalurResponse = {
            periode_jalur_id: response.periode_jalur_id,
            periode_id: response.periode_id,
            jalur_id: response.jalur_id,
            jalur_nama: response.jalur.jalur_nama,
            waktu_mulai: response.waktu_mulai
               ? response.waktu_mulai.toISOString()
               : "",
            waktu_selesai: response.waktu_selesai
               ? response.waktu_selesai.toISOString()
               : "",
            metode_ranking: response.metode_ranking
         };
         return editedPeriodeJalur;
      } catch (error) {
         if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
               throw new AppError("periode dan jalur sudah ada", 400);
            }
         }
      }
      throw error;
   }

   static async deletePeriodeJalurById(periodeJalurId: number): Promise<{
      periode_jalur_id: number;
   }> {
      return await PeriodeRepository.deletePeriodeJalurById(periodeJalurId);
   }

   private static async checkPeriodTimesRange(
      periode: Periode,
      waktu_mulai: Date,
      waktu_selesai: Date

   ) {
      // Validasi apakah `periode` memiliki waktu_mulai dan waktu_selesai
      if (!periode.waktu_mulai || !periode.waktu_selesai) {
         throw new AppError(
            "Periode must have valid start and end times",
            400
         );
      }

      if (
         waktu_mulai < periode.waktu_mulai || // waktu_mulai terlalu awal
         waktu_selesai > periode.waktu_selesai // waktu_selesai terlalu akhir
      ) {
         logger.warn("Invalid time range on createPeriodeJalur");
         throw new AppError("Waktu harus berada pada rentang periode", 400);
      }

   }

   // jadwal
   static async createJadwal(
      periodeJalurId: number,
      tahapanId: number,
      waktu_mulai: string,
      waktu_selesai: string
   ): Promise<GetAllJadwalResponse> {
      const created_at = new Date().toISOString();

      if (periodeJalurId) {
         const periodeJalur = await PeriodeRepository.findPeriodeJalurById(
            periodeJalurId
         );
         if (!periodeJalur) {
            throw new AppError(
               `PeriodeJalur with id ${periodeJalurId} not found`,
               404
            );
         }
         if (!periodeJalur.waktu_mulai || !periodeJalur.waktu_selesai) {
            throw new AppError(
               "PeriodeJalur must have valid start and end times",
               400
            );
         }
         if (periodeJalur.waktu_mulai && periodeJalur.waktu_selesai && waktu_mulai && waktu_selesai) {

            const waktuMulai = new Date(waktu_mulai!);
            const waktuSelesai = new Date(waktu_selesai!);
            const tes1 = waktuMulai < periodeJalur.waktu_mulai 
            const tes2 = waktuSelesai > periodeJalur.waktu_selesai
            console.log(`waktu mulai lebih awal dari waktu mulai periodeJalur? -> ${tes1}`)
            console.log(`waktu selesai lebih akhir dari waktu selesai periodeJalur? -> ${tes2}`)
            if (
                  waktuMulai < periodeJalur.waktu_mulai ||
                  waktuSelesai > periodeJalur.waktu_selesai
            ) {
               logger.warn("invalid time range on createJadwal");
               throw new AppError("Time must be within the periodeJalur range", 400);
            }
         }
      }
      try {
         const response = await PeriodeRepository.createJadwal(
            periodeJalurId,
            tahapanId,
            waktu_mulai,
            waktu_selesai,
            created_at
         );
   
         const newJadwal: GetAllJadwalResponse = {
            jadwal_id: response.jadwal_id,
            periode_jalur_id: response.periode_jalur_id,
            tahapan_id: response.tahapan_id,
            tahapan_nama: response.tahapan.tahapan_nama,
            is_closed: response.is_closed,
            waktu_mulai: response.waktu_mulai
               ? response.waktu_mulai.toISOString()
               : "",
            waktu_selesai: response.waktu_selesai
               ? response.waktu_selesai.toISOString()
               : "",
         };
   
         return newJadwal;
         
      } catch (error) {
         if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
         ) {
            throw new AppError("Tahapan already exist", 409);
         }
         throw error;
      }
   }

   static async getAllJadwal(
      periodeJalurId: number
   ): Promise<GetAllJadwalResponse[]> {
      const jadwals = await PeriodeRepository.findAllJadwalByPeriodeJalurId(periodeJalurId);
      const response: GetAllJadwalResponse[] = jadwals.map((jadwal) => ({
         jadwal_id: jadwal.jadwal_id,
         periode_jalur_id: jadwal.periode_jalur_id,
         tahapan_id: jadwal.tahapan_id,
         tahapan_nama: jadwal.tahapan.tahapan_nama,
         is_closed: jadwal.is_closed,
         waktu_mulai: new Date(jadwal.waktu_mulai!).toISOString(),
         waktu_selesai: new Date(jadwal.waktu_selesai!).toISOString(),
      }));

      return response;
   }

   static async updateJadwalById(
      filterKey: "updateIsClosed" | "updateData",
      jadwalId: number,
      periodeJalurId?: number,
      waktu_mulai?: string,
      waktu_selesai?: string,
      tahapanId?: number,
      isClosed?: number
   ): Promise<GetAllJadwalResponse> {
      if(filterKey === 'updateData') {
         if (periodeJalurId) {
            const periodeJalur = await PeriodeRepository.findPeriodeJalurById(
               periodeJalurId
            );
            if (!periodeJalur) {
               throw new AppError(
                  `PeriodeJalur with id ${periodeJalurId} not found`,
                  404
               );
            }
            if (!periodeJalur.waktu_mulai || !periodeJalur.waktu_selesai) {
               throw new AppError(
                  "PeriodeJalur must have valid start and end times",
                  400
               );
            }

            if (periodeJalur.waktu_mulai && periodeJalur.waktu_selesai && waktu_mulai && waktu_selesai) {
   
               const waktuMulai = new Date(waktu_mulai!);
               const waktuSelesai = new Date(waktu_selesai!);
               const tes1 = waktuMulai < periodeJalur.waktu_mulai 
               const tes2 = waktuSelesai > periodeJalur.waktu_selesai
               console.log(`${periodeJalur.waktu_mulai} -> ${waktuMulai}`)
               console.log(`waktu mulai lebih awal dari waktu mulai periodeJalur? -> ${tes1}`)
               console.log(`waktu selesai lebih akhir dari waktu selesai periodeJalur? -> ${tes2}`)
               if (
                     waktuMulai < periodeJalur.waktu_mulai ||
                     waktuSelesai > periodeJalur.waktu_selesai
               ) {
                  logger.warn("invalid time range on createJadwal");
                  throw new AppError("Time must be within the period range", 400);
               }
            }
         }
      }
      const data =
         filterKey === "updateData"
            ? {
                 tahapan_id: tahapanId,
                 waktu_mulai: waktu_mulai,
                 waktu_selesai: waktu_selesai,
              }
            : { is_closed: isClosed };
      const response = await PeriodeRepository.updateJadwalById(jadwalId, data);

      const updatedJadwal: GetAllJadwalResponse = {
         jadwal_id: response.jadwal_id,
         periode_jalur_id: response.periode_jalur_id,
         tahapan_id: response.tahapan_id,
         tahapan_nama: response.tahapan.tahapan_nama,
         is_closed: response.is_closed,
         waktu_mulai: response.waktu_mulai
            ? response.waktu_mulai.toISOString()
            : "",
         waktu_selesai: response.waktu_selesai
            ? response.waktu_selesai.toISOString()
            : "",
      };

      return updatedJadwal;
   }

   static async deleteJadwalById(jadwal_id: number): Promise<{
      jadwal_id: number;
   }> {
      return await PeriodeRepository.deleteJadwalById(jadwal_id);
   }
}
