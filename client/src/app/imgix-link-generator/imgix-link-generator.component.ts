import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'imgix-link-generator',
  templateUrl: './imgix-link-generator.component.html',
  styleUrls: ['./imgix-link-generator.component.css']
})
export class ImgixLinkGeneratorComponent implements OnChanges {
    @Input() transformsArray;
    @Input() width;
    @Input() height;
    links = [];    

    ngOnChanges(changes: SimpleChanges) {
        this.generateLinks(changes.transformsArray.currentValue);  
    }

    generateLinks(transforms){
        this.links = transforms.map((info) => {
            return `?rot=${info.transforms.rotation}&w=${this.width}&h=${this.height}&crop=focalpoint&fp-x=${info.transforms.positionX}&fp-y=${info.transforms.positionY}&fp-z=${info.transforms.scale}`;
        });
    }
}