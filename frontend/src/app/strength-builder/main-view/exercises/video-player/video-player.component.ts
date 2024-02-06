import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import getVideoId from 'get-video-id';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnChanges, OnInit {
  @Input() url: string = '';
  videoId: any

  videoWidth: number = 250; // Domyślna szerokość
  videoHeight: number = 250; // Domyślna wysokość

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.videoId = getVideoId(this.url)
    console.log(this.videoId)
  }
  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.videoWidth = 160; // Dostosuj do mniejszego ekranu
          this.videoHeight = 90;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.videoWidth = 480;
          this.videoHeight = 270;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.videoWidth = 480;
          this.videoHeight = 270;
        } else {
          this.videoWidth = 863; // Dla Large i XLarge
          this.videoHeight = 485;
        }
      }
      console.log(this.videoHeight)
      console.log(this.videoWidth)
    });
  }
}
