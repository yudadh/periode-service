import { Request, Response, NextFunction } from "express";
import { PeriodeService } from "../services/periodeService";
import { logger } from "../utils/logger";
import { AppError } from "../utils/appError";
import { successResponse } from "../utils/successResponse";
import {
   PeriodeJalurRequest,
   GetAllPeriodeJalurResponse,
   PeriodeJalurDTO,
   JadwalRequest,
   GetAllJadwalResponse,
   PeriodeDTO,
   PeriodeResponseDTO,
   JalurDTO,
   PaginationMeta,
} from "../interfaces/periodeInterface";

export async function createPeriode(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const request: PeriodeDTO = req.body;
      const response: PeriodeResponseDTO =
         await PeriodeService.createPeriode(request.nama_periode, request.waktu_mulai, request.waktu_selesai);
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in createPeriode]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in createPeriode]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in createPeriode]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function getAllPeriode(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { page = 1, limit = 10 } = req.query
      const response = await PeriodeService.getAllPeriode(
         Number(page as string),
         Number(limit as string)
      );
      const meta: PaginationMeta = {
         total: response.total,
         limit: Number(limit),
         page: Number(page)
      }
      successResponse(res, 200, response.response, meta);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in getAllPeriode]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in getAllPeriode]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in getAllPeriode]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function updatePeriodeById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const newPeriode: PeriodeDTO = req.body;
      console.log(newPeriode)
      const response = await PeriodeService.updatePeriodeById(
         Number(id as string),
         newPeriode.nama_periode,
         newPeriode.waktu_mulai,
         newPeriode.waktu_selesai
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updatePeriodeById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in updatePeriodeById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in updatePeriodeById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function deletePeriodeById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response = await PeriodeService.deletePeriodeById(
         Number(id as string)
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in deletePeriodeById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in deletePeriodeById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in deletePeriodeById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

// tahapan
export async function createTahapan(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { nama_tahapan }: { nama_tahapan: string } = req.body;
      const response = await PeriodeService.createTahapan(nama_tahapan);
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in createTahapan]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in createTahapan]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in createTahapan]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function getAllTahapan(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const response = await PeriodeService.getAllTahapan();
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in getAllTahapan]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in getAllTahapan]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in getAllTahapan]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function updateTahapanById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const { tahapanNama }: { tahapanNama: string } = req.body;
      const response = await PeriodeService.updateTahapanById(
         Number(id as string),
         tahapanNama
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updateTahapanById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in updateTahapanById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in updateTahapanById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function deleteTahapanById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response = await PeriodeService.deleteTahapanById(
         Number(id as string)
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in deleteTahapanById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in deleteTahapanById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in deleteTahapanById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

// jalur
export async function createJalur(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { nama_jalur }: { nama_jalur: string } = req.body;
      const response = await PeriodeService.createJalur(nama_jalur);
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in createJalur]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in createJalur]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in createJalur]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function getAllJalur(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const response = await PeriodeService.getAllJalur();
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in getAllJalur]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in getAllJalur]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in getAllJalur]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function updateJalurById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params
      const { nama_jalur }: { nama_jalur: string } = req.body
      const response = await PeriodeService.updateJalurById(
         Number(id),
         nama_jalur
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updateJalurById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in updateJalurById]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in updateJalurById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function deleteJalurById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params
      const response = await PeriodeService.deleteJalurById(
         Number(id)
      )
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updateJalurById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in updateJalurById]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in updateJalurById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

// periodeJalur
export async function createPeriodeJalur(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const request: PeriodeJalurDTO = req.body;
      const response: GetAllPeriodeJalurResponse = await PeriodeService.createPeriodeJalur(
         request.periode_id,
         request.jalur_id,
         request.waktu_mulai,
         request.waktu_selesai,
         request.metode_ranking
      );
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in createPeriodeJalur]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in createPeriodeJalur]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in createPeriodeJalur]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function getAllPeriodeJalurByPeriodeId(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response: GetAllPeriodeJalurResponse[] =
         await PeriodeService.getAllPeriodeJalurByPeriodeId(Number(id as string));
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in getAllPeriodeJalur]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in getAllPeriodeJalur]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in getAllPeriodeJalur]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

//getPeriodeJalurById belum

export async function updatePeriodeJalurById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params
      const request: PeriodeJalurRequest = req.body;
      console.log(request)
      const response = await PeriodeService.updatePeriodeJalurById(
         Number(id),
         request.jalur_id,
         request.waktu_mulai,
         request.waktu_selesai,
         request.metode_ranking
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updatePeriodeJalurById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in updatePeriodeJalurById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in updatePeriodeJalurById]: ${JSON.stringify(
               error
            )}`
         );
      }
      next(error);
   }
}

export async function deletePeriodeJalurById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response = await PeriodeService.deletePeriodeJalurById(
         Number(id as string)
      );
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in deletePeriodeJalurById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in deletePeriodeJalurById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in deletePeriodeJalurById]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

// jadwal
export async function createJadwal(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const request: JadwalRequest = req.body;
      const response = await PeriodeService.createJadwal(
         request.periode_jalur_id,
         request.tahapan_id,
         request.waktu_mulai,
         request.waktu_selesai
      );
      successResponse(res, 201, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in createJadwal]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in createJadwal]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in createJadwal]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function getAllJadwalByPeriodeJalurId(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response: GetAllJadwalResponse[] =
         await PeriodeService.getAllJadwal(Number(id as string));
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in getAllJadwal]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(`[Unexpected Error in getAllJadwal]: ${error.message}`, {
            stack: error.stack,
         });
      } else {
         logger.error(
            `[Unknown Error in getAllJadwal]: ${JSON.stringify(error)}`
         );
      }
      next(error);
   }
}

export async function updateJadwalById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const request: JadwalRequest = req.body;
      const response = await PeriodeService.updateJadwalById(
         "updateData",
         Number(id),
         request.periode_jalur_id,
         request.waktu_mulai,
         request.waktu_selesai,
         request.tahapan_id,
         undefined
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updateJadwalById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in updateJadwalById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in updateJadwalById]: ${JSON.stringify(
               error
            )}`
         );
      }
      next(error);
   }
}

export async function updateIsClosedJadwal(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const { is_closed }: { is_closed: number } = req.body;
      const response = await PeriodeService.updateJadwalById(
         "updateIsClosed",
         Number(id),
         undefined,
         undefined,
         undefined,
         undefined,
         is_closed
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in updateJadwalById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in updateJadwalById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in updateJadwalById]: ${JSON.stringify(
               error
            )}`
         );
      }
      next(error);
   }
}

export async function deleteJadwalById(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const { id } = req.params;
      const response = await PeriodeService.deleteJadwalById(
         Number(id)
      );
      successResponse(res, 200, response, null);
   } catch (error) {
      // Logging berdasarkan jenis error
      if (error instanceof AppError) {
         logger.warn(`[AppError in deleteJadwalById]: ${error.message}`);
      } else if (error instanceof Error) {
         logger.error(
            `[Unexpected Error in deleteJadwalById]: ${error.message}`,
            {
               stack: error.stack,
            }
         );
      } else {
         logger.error(
            `[Unknown Error in deleteJadwalById]: ${JSON.stringify(
               error
            )}`
         );
      }
      next(error);
   }
}
