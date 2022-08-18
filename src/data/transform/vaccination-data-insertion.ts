import fs from 'fs';
import moment from 'moment';
import { VaccineTracker, VaccineTrackerDetail } from '../interface/vaccine_tracker';
import VaccineTrackerModel from '../../models/vaccine-tracker.model';
// import VaccinationData from '../vaccination-data.json';

export function extractVaccinationData(): Array<VaccineTrackerDetail> {
  const vaccinationData = fs.readFileSync('./src/data/vaccination-data.json').toString();
  const parseJson: VaccineTracker = JSON.parse(vaccinationData);

  return parseJson.records;
}

export async function transformDataAndInsert() {
  try {
    const countOfVaccination = await VaccineTrackerModel.count();

    if (!countOfVaccination) {
      const vaccinationData = extractVaccinationData();
      await VaccineTrackerModel.insertMany(
        vaccinationData.map((data) => ({ ...data, YearWeekDate: moment(data.YearWeekISO) })),
      );
    }
  } catch (error) {
    throw error;
  }
}
