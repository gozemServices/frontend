import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A generic date range validator.
 * - Checks if the start date is before the end date.
 * - If no start date is provided, it uses the current date (now).
 * 
 * @param startDate The start date field.
 * @param endDate The end date field.
 * @param defaultStart If true, the start date will default to the current date (now) if not provided.
 * @returns ValidationErrors or null if valid.
 */
export function dateRangeValidator(
  startDate: string, 
  endDate: string, 
  defaultStart: boolean = true
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startDateControl = group.get(startDate);
    const endDateControl = group.get(endDate);

    if (!startDateControl || !endDateControl) {
      return null; // If either date field is missing, skip validation
    }

    const start = startDateControl.value ? new Date(startDateControl.value) : (defaultStart ? new Date() : null);
    const end = endDateControl.value ? new Date(endDateControl.value) : null;

    if (!start || !end) {
      return null; // Skip if one of the dates is missing
    }

    // Ensure the start date is before the end date
    if (start > end) {
      return { invalidRange: true };
    }

    return null; // Valid range
  };
}
