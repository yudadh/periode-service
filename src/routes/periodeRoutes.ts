import express from "express";
import { authMiddleware } from "../middleware/jwtAuth";
import { roleMiddleware } from "../middleware/verifyRole";
import { validateRequest } from "../middleware/validation";
import {
   createJadwalBodySchema,
   createJalurBodySchema,
   createPeriodeBodySchema,
   createPeriodeJalurBodySchema,
   createTahapanBodySchema,
   periodeParamsSchema,
   updateIsClosedBodySchema,
   updatePeriodeJalurBodySchema,
} from "../validation/periodeSchema";
import * as PeriodeController from "../controllers/periodeController";

const router = express.Router();

router.post(
   "/periode",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ body: createPeriodeBodySchema }),
   PeriodeController.createPeriode
);

router.get(
   "/periode",
   authMiddleware,
   roleMiddleware(["siswa", "adminSD", "adminSMP","adminDisdik"]),
   PeriodeController.getAllPeriode
);

router.put(
   "/periode/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema,
      body: createPeriodeBodySchema,
   }),
   PeriodeController.updatePeriodeById
);

router.delete(
   "/periode/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ params: periodeParamsSchema }),
   PeriodeController.deletePeriodeById
);

// tahapan
router.post(
   "/tahapan",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ body: createTahapanBodySchema }),
   PeriodeController.createTahapan
);

router.get(
   "/tahapan",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   PeriodeController.getAllTahapan
);

router.put(
   "/tahapan/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema,
      body: createTahapanBodySchema,
   }),
   PeriodeController.updateTahapanById
);

router.delete(
   "/tahapan/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ params: periodeParamsSchema }),
   PeriodeController.deleteTahapanById
);

//jalur
router.post(
   "/jalur",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ body: createJalurBodySchema }),
   PeriodeController.createJalur
);

router.get(
   "/jalur",
   authMiddleware,
   roleMiddleware(["siswa", "adminSD", "adminSMP", "adminDisdik"]),
   PeriodeController.getAllJalur
)

router.put(
   "/jalur/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema, 
      body: createJalurBodySchema 
   }),
   PeriodeController.updateJalurById
)

router.delete(
   "/jalur/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ params: periodeParamsSchema }),
   PeriodeController.deleteJalurById
)

// periodeJalur
router.post(
   "/periode-jalur",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ body: createPeriodeJalurBodySchema }),
   PeriodeController.createPeriodeJalur
);

router.get(
   "/periode-jalur/:id",
   authMiddleware,
   validateRequest({ params: periodeParamsSchema }),
   PeriodeController.getAllPeriodeJalurByPeriodeId
);

router.put(
   "/periode-jalur/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema,
      body: updatePeriodeJalurBodySchema,
   }),
   PeriodeController.updatePeriodeJalurById
);

router.delete(
   "/periode-jalur/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({params: periodeParamsSchema}),
   PeriodeController.deletePeriodeJalurById
)

// jadwal
router.post(
   "/jadwal",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({ body: createJadwalBodySchema }),
   PeriodeController.createJadwal
);

router.get(
   "/jadwal/:id",
   authMiddleware,
   roleMiddleware(["siswa", "adminSMP", "adminSD", "adminDisdik"]),
   validateRequest({ params: periodeParamsSchema }),
   PeriodeController.getAllJadwalByPeriodeJalurId
);

router.put(
   "/jadwal/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema,
      body: createJadwalBodySchema,
   }),
   PeriodeController.updateJadwalById
);

router.patch(
   "/jadwal/status/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({
      params: periodeParamsSchema,
      body: updateIsClosedBodySchema,
   }),
   PeriodeController.updateIsClosedJadwal
);

router.delete(
   "/jadwal/:id",
   authMiddleware,
   roleMiddleware(["adminDisdik"]),
   validateRequest({params: periodeParamsSchema}),
   PeriodeController.deleteJadwalById
)

export default router;
