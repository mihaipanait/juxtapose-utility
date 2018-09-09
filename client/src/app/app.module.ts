import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploadService } from './shared/UploadService';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { ImgixLinkGeneratorComponent } from './imgix-link-generator/imgix-link-generator.component';

import {MatButtonModule, MatCheckboxModule, MatSliderModule, MatFormFieldModule, MatCardModule, MatGridListModule, MatExpansionModule, MatTabsModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileEditorComponent,
    ImgixLinkGeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [
    HttpClient,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
