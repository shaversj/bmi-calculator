import * as z from "zod";

export const bmiSchema = z
  .object({
    unit: z.enum(["metric", "imperial"]),
    metricGroup: z
      .object({
        height: z.number().min(1).positive().or(z.nan()).optional(),
        weight: z.number().min(1).positive().or(z.nan()).optional(),
      })
      .optional(),
    imperialGroup: z
      .object({
        feet: z.number().min(1).positive().or(z.nan()).optional(),
        inches: z.number().min(1).positive().or(z.nan()).optional(),
        stone: z.number().min(1).positive().or(z.nan()).optional(),
        pounds: z.number().min(1).positive().or(z.nan()).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.unit === "metric") {
      if (!data.metricGroup || !data.metricGroup.height || !data.metricGroup.weight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["metricGroup"],
          message: "Height and Weight are required for metric units.",
        });
      }
    } else if (data.unit === "imperial") {
      if (!data.imperialGroup || !data.imperialGroup.feet || !data.imperialGroup.inches || !data.imperialGroup.stone || !data.imperialGroup.pounds) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["imperialGroup"],
          message: "Feet/Inches or Stone/Pounds are required for imperial units.",
        });
      }
    }
  });

export interface WeightRange {
  metric: {
    min: {
      pounds: number;
    };
    max: {
      pounds: number;
    };
  };
  imperial: {
    min: {
      stone: number;
      pounds: number;
    };
    max: {
      stone: number;
      pounds: number;
    };
  };
}

export type UnitType = "metric" | "imperial" | undefined;
