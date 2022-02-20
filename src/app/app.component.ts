import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();
  search: string | any;
  iss: boolean = false;
  urlSafe: SafeResourceUrl;
  constructor(private spinner: NgxSpinnerService, 
    private youTubeService: YoutubeService,
    private sanitizer: DomSanitizer) { }


  ngOnInit() {

  }
  sea() {
    if (this.search == null) {
      this.iss = true;
      setTimeout(() => {
        this.iss = false;
      }, 3000)
    }
    else {
      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide()
      }, 3000)
      this.videos = [];
      this.youTubeService
        .getVideosForChanel(this.search, 200)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(lista => {
          for (let element of lista["items"]) {
            this.videos.push(element)
          }
        });
        this.search=null;
    }
  }
}
