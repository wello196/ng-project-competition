import { Component, computed, inject, input, signal } from '@angular/core';
import { CompetitionService } from '../../core/Services/competition-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompetitionResponse } from '../../core/models/competiton-model';
import { Alert } from '../../shared/components/alert/alert';
import { Success } from '../../shared/components/success/success';

@Component({
  imports: [ReactiveFormsModule, Alert, Success],
  selector: 'app-submit-project',
  styleUrl: './submit-project.css',
  templateUrl: './submit-project.html',
})
export class SubmitProject {
  competitionId=input.required<number>();
  competitionTitle=signal('');
  isSubmitted=signal(false);
  errMessage=signal('');
  private competitionService=inject(CompetitionService);
  ngOnInit(){
    this.competitionService.getCompetitionById(this.competitionId()).subscribe({
      next:(response)=>{
        this.competitionTitle.set(response.title)
      }
    })
  }

  
  private formBuilder=inject(FormBuilder).nonNullable;
  submitForm=this.formBuilder.group({
    title:['',[Validators.required]],
    description:['',[Validators.required]],
    link:['',[Validators.required]],
    submissionDate:['',Validators.required]
  })

  get title(){
    return this.submitForm.get('title');
  }
  get description(){
    return this.submitForm.get('description');
  }
  get link(){
    return this.submitForm.get('link');
  }
  get submissionDate(){
    return this.submitForm.get('submissionDate');
  }

  onSubmitForm(){
    if(this.submitForm.invalid){
      this.submitForm.markAllAsTouched();
      return
    }
    this.errMessage.set('');
    const payload={
     
     submissionId: 0,
    competitionId: Number(this.competitionId()),
    userId: localStorage.getItem('userId'), 
    projectTitle: this.title?.getRawValue(),
    description: this.description?.getRawValue(),
    githubLink: this.link?.getRawValue(),
    submissionDate: new Date(this.submissionDate?.getRawValue()).toISOString(),
    status: '',
    rank: null
    }

    this.competitionService.submitProject(payload).subscribe({
      next:(response)=>{
        console.log(response);
        this.isSubmitted.set(true);
      },
      error:(error)=>{
        if(error.status==409){
          this.errMessage.set('Project already submitted');
        }
        else{
          this.errMessage.set('Something went wrong');
        }
      }
    })

  }
}
