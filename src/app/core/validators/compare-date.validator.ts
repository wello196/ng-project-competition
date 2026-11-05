import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CompareDateValidator {
   static compareDates(date1:string,date2:string){
    return (form:AbstractControl) => {
        const start = form.get(date1)?.value;
        const end = form.get(date2)?.value;
        if (!start || !end) {
        return null;
      }

        const startDate=new Date(start).getTime();
        const endDate=new Date(end).getTime();
        return startDate>endDate?{dateNotMatch:true}:null
    }
    
    
   
   }
}