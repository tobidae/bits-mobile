import { UtilProvider } from './../util/util';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

declare var window: any;
declare var cordova: any;

@Injectable()
export class UploadProvider {
  constructor(
    public http: HttpClient, public camera: Camera, public file: File, public utilProvider: UtilProvider) {
  }

  uploadImageBlob(imageBlob, imageName, basePath) {
    let newImageName = imageName + '.jpg';
    let storageRef = firebase.storage().ref();
    imageBlob.name = newImageName;

    let loader = this.utilProvider.initLoader('Uploading image...');
    loader.present();

    return new Promise((resolve, reject) => {
      let uploadTask = storageRef.child(`${basePath}/${newImageName}`).put(imageBlob);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        let progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
        loader.setContent(`Uploading image... ${progress}%`);
      }, (error) => {
        loader.dismissAll();
        reject(error);
      }, () => {
        loader.dismissAll();
        resolve(uploadTask.snapshot.ref.getDownloadURL());
      });
    });
  }

  deleteImageData(name: string, basePath: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${basePath}/${name}`).delete();
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
        fileEntry.file((resFile) => {
          let reader = new FileReader();
          reader.onloadend = (evt: any) => {
            let imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            resolve(imgBlob);
          };
          reader.onerror = (e) => {
            reject(e);
          };
          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    return this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
        return newFileName;
      }, error => {
        console.log(error);
        this.utilProvider.presentToast('Error while storing file.');
        return error;
      });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    }
    return cordova.file.dataDirectory + img;
  }
}
