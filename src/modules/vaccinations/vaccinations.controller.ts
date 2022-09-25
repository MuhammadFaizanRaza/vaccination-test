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
      const weekCounts = Math.round(parseDateTo.diff(parseDateFrom, 'week') / rangeSize);

      const query = {
        ReportingCountry: c,
        YearWeekDate: {
          $gte: moment(dateFrom).toDate(),
          $lte: moment(dateTo).toDate(),
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
            ReportingCountry: { $first: '$YearWeekDate' },
          },
        },
        {
          $project: {
            _id: 0,
            week: '$_id',
            NumberDosesReceived: true,
            YearWeekDate: true,
            ReportingCountry: true,
          },
        },
        { $sort: { week: 1 } },

        {
          $bucketAuto: {
            groupBy: '$week',
            buckets: weekCounts,
            output: {
              count: { $sum: '$NumberDosesReceived' },
            },
          },
        },

        {
          $project: {
            _id: 0,
            startWeek: '$_id.min',
            endWeek: '$_id.max',
            NumberDosesReceived: '$count',
          },
        },
      ]);

      sendResponse(res, VaccinationsSuccess.GET_ALL_VACCINATION, 'Get all vaccinations summary', { summaryQuery });
    } catch (error) {
      next(error);
    }
  };
}
