import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repo-tag',
  templateUrl: './repo-tag.component.html',
  styleUrls: ['./repo-tag.component.scss']
})
export class RepoTagComponent implements OnInit {
  languages: string[] = [];
  @Input() languages_url: any;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getLanguages(this.languages_url);
  }

  getLanguages(url: string) {
    this.apiService.getLanguages(url).subscribe((languagesJson: any[]) => {
      const languages: [string, number][] = Object.entries(languagesJson);

      // Sort the array by values in descending order
      languages.sort((a, b) => b[1] - a[1]);
      let mxlang = 0;
      for(const language of languages) {
        if (mxlang == 3) break; 
        this.languages.push(language[0]);
        mxlang++;
      }
    });
  }
}
