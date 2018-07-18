import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    bucket = new S3({
        accessKeyId: environment.s3.accessKey,
        secretAccessKey: environment.s3.secretKey,
        region: environment.s3.region
    });

    constructor(private tokenService: TokenService, @Inject(LOCALE_ID) private locale: string) {}

    uploadBlob(entity: string, fileName: string, contentType: string, blob: Blob): Promise<string> {
        const params = {
            Bucket: environment.s3.bucket,
            Key: this.tokenService.tenantId + '/' + entity + '/' + this.appendTimeStamp(fileName),
            ContentType: contentType,
            Body: blob
        };

        return this.bucket
            .upload(params)
            .promise()
            .then(x => {
                return x.Key;
            });
    }

    uploadImageWithThumb(
        entity: string,
        fileName: string,
        contentType: string,
        original: Blob,
        thumb: Blob,
        icon: Blob
    ): Promise<string> {
        const key =
            this.tokenService.tenantId + '/' + entity + '/' + this.appendTimeStamp(fileName);

        // Upload thumb
        this.bucket.upload({
            Bucket: environment.s3.bucket,
            Key: this.appendThumb(key),
            ContentType: contentType,
            Body: thumb
        }).promise();

        // Upload icon
        this.bucket.upload({
            Bucket: environment.s3.bucket,
            Key: this.appendIcon(key),
            ContentType: contentType,
            Body: icon
        }).promise();

        // Upload original
        return this.bucket
            .upload({
                Bucket: environment.s3.bucket,
                Key: key,
                ContentType: contentType,
                Body: original
            })
            .promise()
            .then(x => {
                return x.Key;
            });
    }

    getURL(key: string): string {
        const params = {
            Bucket: environment.s3.bucket,
            Key: key
        };
        return this.bucket.getSignedUrl('getObject', params);
    }

    getThumbURL(key: string): string {
        const params = {
            Bucket: environment.s3.bucket,
            Key: this.appendThumb(key)
        };
        return this.bucket.getSignedUrl('getObject', params);
    }

    getIconURL(key: string): string {
        const params = {
            Bucket: environment.s3.bucket,
            Key: this.appendIcon(key)
        };
        return this.bucket.getSignedUrl('getObject', params);
    }

    deleteWithThumb(key: string): Promise<boolean> {
        const params = {
            Bucket: environment.s3.bucket,
            Delete: {
                Objects: [
                    { Key: key },
                    { Key: this.appendThumb(key) },
                    { Key: this.appendIcon(key) }
                ],
                Quiet: false
            }
        };
        return this.bucket
            .deleteObjects(params)
            .promise()
            .then(x => {
                return true;
            });
    }

    private appendTimeStamp(fileName: string): string {
        const timestamp = formatDate(new Date(), 'yyyyMMddHHmmss', this.locale);
        return timestamp + fileName;
    }
    private appendThumb(key: string): string {
        const position = key.lastIndexOf('/') + 15;
        const ret = key.substr(0, position) + '_ct_thumb_' + key.substr(position);
        return ret;
    }
    private appendIcon(key: string): string {
        const position = key.lastIndexOf('/') + 15;
        return key.substr(0, position) + '_ct_icon_' + key.substr(position);
    }
}
