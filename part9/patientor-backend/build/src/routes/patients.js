"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSsnEntries());
});
router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = patientService_1.default.addEntries({ name, dateOfBirth, ssn, gender, occupation });
    res.send(newPatientEntry);
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(patientService_1.default.findById(id));
});
exports.default = router;
