import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import VaccineTrackerModel from '../../models/vaccine-tracker.model';
import VaccinationsSuccess from '../../libraries/mappings/success/vaccinations.success';
import sendResponse from '../../libraries/sendResponse.lib';
import VaccineSummaryQuery from './interfaces/query.interface';

export default class VaccinationsController {
  vaccineSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { c, dateFrom, dateTo, range } = req.query as unknown as VaccineSummaryQuery;
      const rangeSize = Number(range);
      const parseDateFrom = moment(dateFrom);
      const parseDateTo = moment(dateTo);

      const query = {
        ReportingCountry: c,
        YearWeekDate: {
          $gte: moment(parseDateFrom).toDate(),
          $lte: moment(parseDateTo).toDate(),
        },
      };

      const summaryQuery = await VaccineTrackerModel.aggregate([
        {
          $match: query,
        },

        {
          $group: {
            _id: '$YearWeekISO',
            NumberDosesReceived: { $sum: '$NumberDosesReceived' },
            YearWeekDate: { $first: '$YearWeekDate' },
          },
        },
        {
          $project: {
            _id: 0,
            week: '$_id',
            NumberDosesReceived: true,
            YearWeekDate: true,
          },
        },
        { $sort: { week: 1 } },
      ]);

      const summary = [];

      let batch = 0;
      while (batch < summaryQuery.length) {
        const batchSize = summaryQuery.length - batch < rangeSize ? summaryQuery.length : batch + rangeSize;
        let NumberDosesReceived = 0;
        let endWeek;
        for (let i = batch; i < batchSize; i += 1) {
          endWeek = summaryQuery[i].week;
          NumberDosesReceived += summaryQuery[i].NumberDosesReceived;
        }
        summary.push({
          weekStart: summaryQuery[batch].week,
          weekEnd: endWeek,
          NumberDosesReceived,
        });
        batch += rangeSize;
      }

      sendResponse(res, VaccinationsSuccess.GET_ALL_VACCINATION, 'Get all vaccinations summary', { summary });
    } catch (error) {
      next(error);
    }
  };
}
