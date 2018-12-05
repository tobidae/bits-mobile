import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilProvider } from "../../providers/util/util";
import { UploadProvider } from "../../providers/upload/upload";
import { DomSanitizer } from "@angular/platform-browser";

declare var cordova: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-create-case',
  templateUrl: 'create-case.html',
})
export class CreateCasePage {
  caseForm: FormGroup;
  isEdit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              private file: File, private filePath: FilePath, private fb: FormBuilder,
              private actionSheetCtrl: ActionSheetController, private utilProvider: UtilProvider,
              public uploadProvider: UploadProvider, private sanitizer: DomSanitizer) {
    this.caseForm = this.fb.group({
      caseImage: [null, Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(60)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
      maxHoldTime: ['', Validators.compose([Validators.required])],
      lastLocation: ['', Validators.compose([Validators.required])],
      datasheetUrl: ['', Validators.compose([Validators.required])],
      color: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      isAvailable: ['', Validators.compose([Validators.required])],
      mass: ['', Validators.compose([Validators.required])],
      rfid: ['', Validators.compose([Validators.required])],
      tags: ['', Validators.compose([Validators.required])],
    });
  }

  openCameraOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add an image for the case',
      buttons: [{
        text: 'Take a Picture',
        icon: 'md-camera',
        handler: () => {
          this.getCaseImage(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Open from Gallery',
        icon: 'md-images',
        handler: () => {
          this.getCaseImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }]
    });
    actionSheet.present();
  }

  getCaseImage(sourceType) {
    if (this.utilProvider.isCordova()) {
      this.utilProvider.checkExternalStoragePermissions().then(res => {
        if (res) {
          let options = {
            quality: 100,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            targetWidth: 540,
            targetHeight: 540
          };

          this.camera.getPicture(options).then((imagePath) => {
            if (this.utilProvider.isAndroid() && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath).then(filePath => {
                // this.file.readAsDataURL(cordova.file.dataDirectory, filePath)
                //   .then((base64) => {
                //     const imageUri = this.sanitizer.bypassSecurityTrustUrl(base64);
                //     this.caseForm.controls['caseImage'].setValue(imageUri);
                //   }, (err) => {
                //     console.log(err);
                //   });
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                let newFileName = this.uploadProvider.createFileName();

                this.copyFileToLocalDir(correctPath, currentName, newFileName);
              });
            } else {
              let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.uploadProvider.createFileName());
            }
          }, (err) => {
            if (err.toLowerCase() != 'selection cancelled.') {
              this.utilProvider.presentToast('Error while selecting case image.');
            }
            console.log(err);
          });
        } else {
          this.utilProvider.presentToast('Cannot access files on your device!');
        }
      })
    } else {
      this.utilProvider.presentToast('Not a mobile device!');
    }
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
        this.caseForm.controls['caseImage'].setValue(newFileName);
      }, error => {
        console.log(error);
        this.utilProvider.presentToast('Error while storing file.');
      });
  }

}
