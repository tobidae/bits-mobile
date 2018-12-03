import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import ImgCache from 'imgcache.js';

/**
 * This service is charged to provide the methods to cache the images
 */
@Injectable()
export class CacheImageProvider {
  public imgQueue: string[] = [];

  constructor(platform: Platform) {

  }

  /**
   * Init imgCache library
   * @return {Promise}
   */
  public initImgCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ImgCache.ready) {
        resolve();
      } else {
        ImgCache.init(() => resolve(), () => reject());
      }
    });
  }

  /**
   * Cache images
   * @param src {string} - img source
   */
  public cacheImg(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ImgCache.isCached(src, (path: string, success: boolean) => {
        if (success) {
          ImgCache.getCachedFileURL(src,
            (originalUrl, cacheUrl) => {
              resolve(cacheUrl);
            },
            (e) => {
              reject(e)
            });
        } else {
          ImgCache.cacheFile(src);
          resolve(src);
        }
      });
    });
  }
}
