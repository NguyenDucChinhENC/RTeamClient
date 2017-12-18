import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  results: any[] =[];

  constructor(private seachService: SearchService) { }

  ngOnInit() {
  }

  onSubmit(value: any){
    this.seachService.search(value.search.content).
      subscribe(response => this.onSearchSuccess(response))
  }

  onSearchSuccess(response){
    this.results = response.data.groups;
    console.log(response.data.groups)
  }

}
