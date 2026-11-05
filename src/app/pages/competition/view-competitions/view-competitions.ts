import { Component, computed, input, signal } from '@angular/core';
import { CompetitionResponse } from '../../../core/models/competiton-model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-view-competitions',
  styleUrl: './view-competitions.css',
  templateUrl: './view-competitions.html',
})
export class ViewCompetitions {
  competitions=input.required<CompetitionResponse[]>();
  readonly CHUNK_SIZE=8;
  counter=signal(this.CHUNK_SIZE);
  visibleCompetitions=computed(()=>{
  return this.competitions().slice(0,this.counter());
  })

loadMore(){
  this.counter.update(old=>old+this.CHUNK_SIZE)
}

hasMore=computed(()=>{
  return this.counter() < this.competitions().length
})



  

}
