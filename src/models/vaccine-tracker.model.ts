import mongoose from 'mongoose';
import Common from '../libraries/constants';

/**
 * Schema
 */
const VaccineTrackerSchema = new mongoose.Schema(
  {
    YearWeekISO: {
      type: String,
      required: true,
    },
    YearWeekDate: {
      type: Date,
      required: true,
    },
    FirstDose: {
      type: Number,
      required: true,
    },
    FirstDoseRefused: {
      type: String,
      default: '',
    },
    SecondDose: {
      type: Number,
      required: true,
    },
    DoseAdditional1: {
      type: Number,
      required: true,
    },
    DoseAdditional2: {
      type: Number,
      required: true,
    },
    UnknownDose: {
      type: Number,
      required: true,
    },
    NumberDosesReceived: {
      type: Number,
      default: 0,
    },
    NumberDosesExported: {
      type: Number,
      default: 0,
    },
    Region: {
      type: String,
      required: true,
    },
    Population: {
      type: String,
      required: true,
    },
    ReportingCountry: {
      type: String,
      required: true,
    },
    TargetGroup: {
      type: String,
      required: true,
    },
    Vaccine: {
      type: String,
      required: true,
    },
    Denominator: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Hooks/Triggers
 */

// pre-hook that will execute before save opration
VaccineTrackerSchema.pre('save', async function preSaveHook(next) {
  // if (this.password) {
  //   const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT_FACTOR));
  //   this.password = hash;
  // }
  next();
});

// pre-hook that will execute before findOneAndUpdate Operation
VaccineTrackerSchema.pre('findOneAndUpdate', async function preFindOneAndUpdateHook(next) {
  // const { password, email } = this.getUpdate();
  // if (password) {
  //   const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
  //   this.getUpdate().password = hash;
  // }
  next();
});

// pre-hook that will execute before find Operation
// VaccineTrackerSchema.pre('find', function preFind(next) {
//   try {
//     this.where({ deletedAt: null });
//   } catch (error) {
//     next(error);
//   }
// });

// pre-hook that will execute before findOne Operation
VaccineTrackerSchema.pre(['find', 'findOne'], async function preFindOne(next) {
  try {
    this.where({ deletedAt: null });
  } catch (error: any) {
    next(error);
  }
});

/**
 * create and export mongoose model
 * @typedef VaccineTrackerSchema
 */
export default mongoose.model(
  Common.Collection.VACCINE_TRACKER,
  VaccineTrackerSchema,
  Common.Collection.VACCINE_TRACKER,
);
