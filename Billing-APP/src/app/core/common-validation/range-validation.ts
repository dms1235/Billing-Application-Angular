import { AbstractControl, Validator, ValidatorFn } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export function RangeValidation(min: any, max: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        if (control.value !== undefined && (isNaN(control.value) || parseInt(control.value) <= min || parseInt(control.value) >= max)) {
            return { maxServiceCustomTime: true };
        }
        return null;
    };
}


export function validateDateRange(dtStart: any, dtend: any, totalDaysDifference: any) {
    var timeDiff = Math.abs(dtend.getTime() - dtStart.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var dateDuration = totalDaysDifference - 1;
    if (dtStart > dtend) {
        return false;
    }
    if (dateDuration != undefined && dateDuration > 0) {
        if (diffDays > dateDuration) {
            // openModelPopp("hi Yash", "Open It");
            return false;
        }
    }
    return true;

}


//Convert date for http network
export function convertDateForHTTP(str: any) {

    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");

}
