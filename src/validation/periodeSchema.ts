import { z } from "zod";

export const paginationSchema = z.object({
   page: z.string().regex(/^\d+$/, "ID must be a numeric string")
});

export const periodeParamsSchema = z.object({
   id: z.string().regex(/^\d+$/, "ID must be a numeric string")
});

export const createPeriodeBodySchema = z.object({
   nama_periode: z.string().regex(/^[A-Za-z0-9\s]+$/, "Nama should only contains alpha numeric and space"),
   waktu_mulai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   waktu_selesai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   
})

export const createTahapanBodySchema = z.object({
   nama_tahapan: z.string().regex(/^[A-Za-z0-9\s]+$/, "Nama should only contains alpha numeric and space")
})

export const createPeriodeJalurBodySchema = z.object({
   periode_id: z.number().int().positive(),
   waktu_mulai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   waktu_selesai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   jalur_id: z.number().int().positive()
})

export const updatePeriodeJalurBodySchema = z.object({
   waktu_mulai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   waktu_selesai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   jalur_id: z.number().int().positive()
})

export const createJadwalBodySchema = z.object({
   periode_jalur_id: z.number().int().positive(),
   waktu_mulai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   waktu_selesai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/),
   tahapan_id: z.number().int().positive()
})

export const updateIsClosedBodySchema = z.object({
   is_closed: z.number().int().min(0).max(1)
})

export const createJalurBodySchema = z.object({
   nama_jalur: z.string().regex(/^[A-Za-z0-9]+$/, "Input must be alphanumeric only")
})

