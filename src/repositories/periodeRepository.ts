import { prisma } from "../utils/database";

export class PeriodeRepository {
   static async createPeriode(
      namaPeriode: string,
      waktu_mulai: string,
      waktu_selesai: string,
      created_at: string
   ) {
      return prisma.periode.create({
         data: {
            nama: namaPeriode,
            waktu_mulai: waktu_mulai,
            waktu_selesai: waktu_selesai,
            created_at: created_at,
         },
         select: {
            periode_id: true,
            nama: true,
            waktu_mulai: true,
            waktu_selesai: true,
         },
      });
   }

   static async findAllPeriode(skip: number, limit: number) {
      return prisma.periode.findMany({
         skip: skip,
         take: limit,
         select: {
            periode_id: true,
            nama: true,
            waktu_mulai: true,
            waktu_selesai: true,
         },
      });
   }

   static async countAllPeriode() {
      return prisma.periode.count()
   }

   static async findPeriodeById(periodeId: number) {
      return prisma.periode.findUnique({
         where: { periode_id: periodeId },
         select: {
            periode_id: true,
            nama: true,
            waktu_mulai: true,
            waktu_selesai: true,
         },
      });
   }

   static async updatePeriodeById(
      periodeId: number,
      newNamaPeriode: string,
      waktu_mulai: string,
      waktu_selesai: string,
      updatedAt: string
   ) {
      return prisma.periode.update({
         where: { periode_id: periodeId },
         data: {
            nama: newNamaPeriode,
            waktu_mulai: waktu_mulai,
            waktu_selesai: waktu_selesai,
            updated_at: updatedAt,
         },
         select: {
            periode_id: true,
            nama: true,
            waktu_mulai: true,
            waktu_selesai: true,
         },
      });
   }

   static async deletePeriodeById(periodeId: number) {
      return prisma.periode.delete({
         where: { periode_id: periodeId },
         select: { periode_id: true },
      });
   }

   // tahapan
   static async createTahapan(namaTahapan: string, create_at: string) {
      return prisma.tahapan.create({
         data: {
            tahapan_nama: namaTahapan,
            created_at: create_at,
         },
         select: { tahapan_id: true },
      });
   }
   
   static async findAllTahapan() {
      return prisma.tahapan.findMany({
         select: {
            tahapan_id: true,
            tahapan_nama: true,
         },
      });
   }

   static async updateTahapanById(tahapanId: number, namaTahapan: string) {
      return prisma.tahapan.update({
         where: { tahapan_id: tahapanId },
         data: { tahapan_nama: namaTahapan },
         select: {
            tahapan_id: true,
         },
      });
   }
   static async deleteTahapanById(tahapanId: number) {
      return prisma.tahapan.delete({
         where: { tahapan_id: tahapanId },
         select: {
            tahapan_id: true,
         },
      });
   }

   // jalur
   static async createJalur(namaJalur: string, createdAt: string) {
      return prisma.jalur.create({
         data: {
            jalur_nama: namaJalur,
            created_at: createdAt,
         },
         select: {
            jalur_id: true,
         },
      });
   }
   static async findAllJalur() {
      return prisma.jalur.findMany({
         select: {
            jalur_id: true,
            jalur_nama: true,
         },
      });
   }
   static async updateJalurById(
      jalurId: number,
      namaJalur: string,
      updatedAt: string
   ) {
      return prisma.jalur.update({
         where: { jalur_id: jalurId },
         data: {
            jalur_nama: namaJalur,
            updated_at: updatedAt,
         },
         select: { jalur_id: true },
      });
   }
   static async deleteJalurById(jalurId: number) {
      return prisma.jalur.delete({
         where: { jalur_id: jalurId },
         select: { jalur_id: true },
      });
   }

   // periodejalur
   static async createPeriodeJalur(
      periodeId: number,
      jalurId: number,
      waktu_mulai: string,
      waktu_selesai: string,
      metode_ranking: "JARAK_LURUS" | "JARAK_RUTE" | null,
      created_at: string
   ) {
      return prisma.periodeJalur.create({
         data: {
            periode_id: periodeId,
            jalur_id: jalurId,
            waktu_mulai: waktu_mulai,
            waktu_selesai: waktu_selesai,
            metode_ranking: metode_ranking,
            created_at: created_at,
         },
         select: {
            periode_jalur_id: true,
            periode_id: true,
            jalur_id: true,
            waktu_mulai: true,
            waktu_selesai: true,
            metode_ranking: true,
            jalur: {
               select: {
                  jalur_nama: true
               }
            }
         },
      });
   }
   static async findAllPeriodeJalurByPeriodeId(periodeId: number) {
      return prisma.periodeJalur.findMany({
         where: { periode_id: periodeId },
         select: {
            periode_jalur_id: true,
            periode_id: true,
            jalur_id: true,
            waktu_mulai: true,
            waktu_selesai: true,
            metode_ranking: true,
            jalur: {
               select: {
                  jalur_nama: true,
               },
            }
         },
      });
   }
   
   static async findPeriodeJalurById(periodeJalurId: number) {
      return prisma.periodeJalur.findUnique({
         where: { periode_jalur_id: periodeJalurId },
         select: {
            jalur_id: true,
            waktu_mulai: true,
            waktu_selesai: true,
            metode_ranking: true,
            periode: {
               select: {
                  periode_id: true,
                  nama: true,
                  waktu_mulai: true,
                  waktu_selesai: true
               }
            }
         },
      });
   }

   static async updatePeriodeJalurById(
      periodeJalurId: number,
      jalurId: number,
      waktu_mulai: string,
      waktu_selesai: string,
      metode_ranking: "JARAK_LURUS" | "JARAK_RUTE" | null,
      updated_at: string
   ) {
      return prisma.periodeJalur.update({
         where: { periode_jalur_id: periodeJalurId },
         data: {
            jalur_id: jalurId,
            waktu_mulai: waktu_mulai,
            waktu_selesai: waktu_selesai,
            metode_ranking: metode_ranking,
            updated_at: updated_at,
         },
         select: {
            periode_jalur_id: true,
            periode_id: true,
            jalur_id: true,
            waktu_mulai: true,
            waktu_selesai: true,
            metode_ranking: true,
            jalur: {
               select: {
                  jalur_nama: true,
               },
            },
         },
      });
   }

   static async deletePeriodeJalurById(periodeJalurId: number) {
      return prisma.periodeJalur.delete({
         where: { periode_jalur_id: periodeJalurId },
         select: {
            periode_jalur_id: true
         }
      })
   }

   //jadwal
   static async createJadwal(
      periodeJalurId: number,
      tahapanId: number,
      waktu_mulai: string,
      waktu_selesai: string,
      created_at: string
   ) {
      return prisma.jadwal.create({
         data: {
            periode_jalur_id: periodeJalurId,
            tahapan_id: tahapanId,
            waktu_mulai: waktu_mulai,
            waktu_selesai: waktu_selesai,
            created_at: created_at,
         },
         select: {
            jadwal_id: true,
            periode_jalur_id: true,
            tahapan_id: true,
            tahapan: {
               select: {
                  tahapan_nama: true
               }
            },
            is_closed: true,
            waktu_mulai: true,
            waktu_selesai: true
         },
      });
   }

   static async findAllJadwalByPeriodeJalurId(periodeJalurId: number) {
      return prisma.jadwal.findMany({
         where: { periode_jalur_id: periodeJalurId },
         select: {
            jadwal_id: true,
            periode_jalur_id: true,
            tahapan_id: true,
            waktu_mulai: true,
            waktu_selesai: true,
            is_closed: true,
            tahapan: {
               select: { tahapan_nama: true },
            },
         },
      });
   }
   
   static async updateJadwalById(jadwalId: number, data: object) {
      return prisma.jadwal.update({
         where: { jadwal_id: jadwalId },
         data: data,
         select: {
            jadwal_id: true,
            periode_jalur_id: true,
            tahapan_id: true,
            tahapan: {
               select: {
                  tahapan_nama: true
               }
            },
            is_closed: true,
            waktu_mulai: true,
            waktu_selesai: true
         },
      });
   }

   static async deleteJadwalById(jadwalId: number) {
      return prisma.jadwal.delete({
         where: { jadwal_id: jadwalId },
         select: {
            jadwal_id: true
         }
      })
   }
}
