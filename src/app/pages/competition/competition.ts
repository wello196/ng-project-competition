import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alert } from '../../shared/components/alert/alert';
import { CompetitionService } from '../../core/Services/competition-service';

import { CompareDateValidator } from '../../core/validators/compare-date.validator';
import { DatePipe } from '@angular/common';
import { CompetitionResponse, CreateCompetition } from '../../core/models/competiton-model';
import { delay } from 'rxjs';
import { Loader } from '../../shared/components/loader/loader';



@Component({
  imports: [ReactiveFormsModule, Alert, DatePipe, Loader],
  selector: 'app-competition',
  styleUrl: './competition.css',
  templateUrl: './competition.html',
})
export class Competition implements OnInit {

   private competitonService=inject(CompetitionService);
  competition=signal<CompetitionResponse[]>([]);
  errMessage=signal('');
  whenReady=signal(false);

  ngOnInit() {
    this.competitonService.getCompetition().pipe(delay(2000)).subscribe({
      next:(response:CompetitionResponse[])=>{
        this.competition.set(response);
        this.whenReady.set(true);
      }
    })
  }
 

  private formBuilder = inject(FormBuilder).nonNullable;
  competitonForm=this.formBuilder.group({
    title:['',[Validators.required]],
    description:['',[Validators.required]],
    date:this.formBuilder.group({
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]]
    },{validators:CompareDateValidator.compareDates('startDate','endDate')}),
   
    status:['Draft',[Validators.required]]
  })

  get title(){
    return this.competitonForm.get('title');
  }

  get description(){
    return this.competitonForm.get('description');
  }

  get date(){
    return this.competitonForm.get('date');
  }

  get startDate(){
    return this.date?.get('startDate');
  }

  get endDate(){
    return this.date?.get('endDate');
  }

  get status(){
    return this.competitonForm.get('status');
  }



  onReset(){
    this.competitonForm.reset()
  }



  onSubmit(){
    if(this.competitonForm.invalid)
    {
      this.competitonForm.markAllAsTouched();
      return
    }
    
    this.errMessage.set('');
    const competitonData:CreateCompetition={
      title:this.title?.getRawValue(),
      description:this.description?.getRawValue(),
      startDate:this.startDate?.getRawValue(),
      endDate:this.endDate?.getRawValue(),
      status:this.status?.getRawValue(),
    }
    this.competitonService.createCompetition(competitonData).subscribe({
      next:(response:CompetitionResponse)=>{
        this.competition.update(current=>[...current,response]);
        this.onReset();
      },
      error:(error)=>{
        if(error.status==409){
          this.errMessage.set('Competition already exists');
        }
        else{
          this.errMessage.set('Something went wrong');
        }
      }
    })
    
  }


  onDelete(id:number|string){
    this.competitonService.deleteCompetition(id).subscribe({
      next:()=>{
        this.competition.update(current=>current.filter(c=>c.competitionId!==id));
      }
    })
    
    
  }

  // update competitions

modal=signal(false);
editingId=signal(0);
onEdit(competition:CompetitionResponse){
  this.editingId.set(competition.competitionId);
  this.modal.set(true);
  this.competitonForm.patchValue({
    title:competition.title,
    description:competition.description,
    date:{
      startDate:competition.startDate,
      endDate:competition.endDate
    },
    status:competition.status
  })



}

onSave(){
  if (this.competitonForm.invalid) {
    this.competitonForm.markAllAsTouched();
    return;
  }
  this.errMessage.set('');
  const competitonData:CreateCompetition={
      title:this.title?.getRawValue(),
      description:this.description?.getRawValue(),
      startDate:this.startDate?.getRawValue(),
      endDate:this.endDate?.getRawValue(),
      status:this.status?.getRawValue(),
    }
  this.competitonService.updateCompetition(this.editingId(),competitonData).subscribe({
    next:(response:CompetitionResponse)=>{
      const updatedCompetition: CompetitionResponse = {
            competitionId: Number(this.editingId()),
            title: competitonData.title,
            description: competitonData.description,
            startDate: competitonData.startDate,
            endDate: competitonData.endDate,
            status: competitonData.status,
          };
     this.competition.update((current) =>
            current.map((c) =>
              Number(c.competitionId) === Number(this.editingId())
                ? updatedCompetition
                : c
            )
          );
      this.onCancelEditForm();
    },
    error:(error)=>{
      if(error.status==409){
        this.errMessage.set('Competition already exists');
      }
      else{
        this.errMessage.set('Something went wrong');
      }
    }
  })
}

onCancelEditForm(){
  this.modal.set(false);
  this.editingId.set(0);
  this.errMessage.set('');
}
 
}
