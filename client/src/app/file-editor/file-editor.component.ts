import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'file-editor',
    templateUrl: './file-editor.component.html',
    styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit {    
    @Input() baseImage;
    @Input() overlayImage;
    @Input() width;
    @Input() height;
    @Output() generateLinks = new EventEmitter<any[]>();
    
    constructor(private sanitizer:DomSanitizer) { }

    overlayTransform = null;
    overlayOpacity = 0.5;
    overlayScaleUniform = 1.0;
    overlayPositionX = 0.5;
    overlayPositionY = 0.5;
    overlayRotation = 0;

    baseTransform = null;
    baseOpacity = 0.5;
    baseScaleUniform = 1.0;
    basePositionX = 0.5;
    basePositionY = 0.5;
    baseRotation = 0;

    ngOnInit(): void {
        this.updateBaseTransform();
        this.updateOverlayTransform();
    }

    updateOverlayTransform(){
        let positionX = this.width * (this.overlayPositionX - 0.5);
        let positionY = this.height * (this.overlayPositionY - 0.5);
        this.overlayTransform = this.sanitizer.bypassSecurityTrustStyle(`translate(-50%,-50%) translateX(${positionX}px) translateY(${positionY}px) scale(${this.overlayScaleUniform})  rotate(${this.overlayRotation}deg)`);
    }

    updateBaseTransform(){
        let positionX = this.width * (this.basePositionX - 0.5);
        let positionY = this.height * (this.basePositionY - 0.5);
        this.baseTransform = this.sanitizer.bypassSecurityTrustStyle(`translate(-50%,-50%) translateX(${positionX}px) translateY(${positionY}px) scale(${this.baseScaleUniform}) rotate(${this.baseRotation}deg)`);
    }

    onOverlayOpacityInputChange(event) {
        this.overlayOpacity = event.value;
        this.updateOverlayTransform();
    }

    onOverlayScaleInputChange(event) {
        this.overlayScaleUniform = event.value;
        this.updateOverlayTransform();
    }

    onOverlayPositionXInputChange(event) {
        this.overlayPositionX = event.value;
        this.updateOverlayTransform();
    }

    onOverlayPositionYInputChange(event) {
        this.overlayPositionY = event.value;
        this.updateOverlayTransform();
    }

    onOverlayRotationInputChange(event) {
        this.overlayRotation = event.value;
        this.updateOverlayTransform();
    }

    onBaseScaleInputChange(event) {
        this.baseScaleUniform = event.value;
        this.updateBaseTransform();
    }

    onBasePositionXInputChange(event) {
        this.basePositionX = event.value;
        this.updateBaseTransform();
    }

    onBasePositionYInputChange(event) {
        this.basePositionY = event.value;
        this.updateBaseTransform();
    }

    onBaseRotationInputChange(event) {
        this.baseRotation = event.value;
        this.updateBaseTransform();
    }

    onReset(){
        this.overlayOpacity = 0.5;
        this.overlayScaleUniform = 1.0;
        this.overlayPositionX = 0.5;
        this.overlayPositionY = 0.5;
        this.overlayRotation = 0;

        this.baseTransform = null;
        this.baseOpacity = 0.5;
        this.baseScaleUniform = 1.0;
        this.basePositionX = 0.5;
        this.basePositionY = 0.5;
        this.baseRotation = 0;

        this.updateBaseTransform();
        this.updateOverlayTransform();
    }

    onGenerate(){
        if (!this.baseImage || !this.overlayImage) {
            return;
        }

        this.generateLinks.emit([{
            image: this.baseImage,
            transforms: {
                scale: this.baseScaleUniform,
                positionX: this.basePositionX,
                positionY: this.basePositionY,
                rotation: this.baseRotation
            }
        },
        {
            image: this.overlayImage,
            transforms: {
                scale: this.overlayScaleUniform,
                positionX: this.overlayPositionX,
                positionY: this.overlayPositionY,
                rotation: this.overlayRotation
            }
        }]);
    }
}