import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  beforeImage = null;
  afterImage = null;
  transformsArray = [];

  outputImageWidth = 500;
  outputImageHeight = 320;

  onBeforeFileSelected(event: SafeUrl) {
    this.beforeImage = event;
  }

  onBeforeFileRemoved() {
    this.beforeImage = null;
    this.transformsArray = [];
  }

  onAfterFileSelected(event: SafeUrl) {
    this.afterImage = event;
  }

  onAfterFileRemoved() {
    this.afterImage = null;
    this.transformsArray = [];
  }

  onGenerateLinks(event){
    this.transformsArray = [];
    event.forEach(transform => {
      this.transformsArray.push(transform);
    });
  }
}
