import { FormControl } from "@angular/forms";

export class CustomValidators {

    public static invalidSeats(control: FormControl) {
    //    var valid = /^\d/.test(control.value);
        if (parseInt(control.value) > 0) {
            return null;
        }
       
        return ({invalidSeats: true});
    }
}