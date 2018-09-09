import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { UploadService } from '../shared/UploadService';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
    @Input() title;
    @Output() fileSelected = new EventEmitter<SafeUrl>();
    @Output() fileRemoved = new EventEmitter();
    @HostBinding('class.dragover') isDragover: boolean = false;

    filePath = null;

    constructor(private upload: UploadService, private sanitizer:DomSanitizer) { }

    onClose(){
        this.filePath = null;
        this.fileRemoved.emit();
    }

    @HostListener('drop', ['$event']) onDropFile(event: DragEvent) {
        event.preventDefault();

        if (this.filePath !== null) {
            return;
        }

        this.uploadFile(event.dataTransfer.files);
        this.isDragover = false;
    }

    @HostListener('dragover', ['$event']) onDragOverFile(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.filePath !== null) {
            return;
        }

        this.isDragover = true;
    }

    @HostListener('dragleave', ['$event']) onDragLeaveFile(event) {
        event.stopPropagation();
        event.preventDefault();

        this.isDragover = false;
    }

    selectFile(event) {
        this.uploadFile(event.target.files);
    }

    uploadFile(files: FileList) {
        if (files.length == 0) {
            return
        }
        
        let file: File = files[0];

        this.upload.uploadFile("http://localhost:3000/api/upload", file)
            .subscribe(
                event => {
                    if (event.type == HttpEventType.UploadProgress) {
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        console.log(`File is ${percentDone}% loaded.`);
                    } else if (event instanceof HttpResponse) {
                        this.filePath = this.sanitizer.bypassSecurityTrustStyle(`url(http://localhost:3000/uploads/${encodeURI(event.body.path)})`);
                        this.fileSelected.emit(this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/uploads/${encodeURI(event.body.path)}`));
                        console.log('File is completely loaded!');
                    }
                },
                (err) => {
                    console.log("Upload Error:", err);
                }, () => {
                    console.log("Upload done");
                }
            )
    }
}