import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { formatDate } from '@angular/common';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    docUrl = environment.docUrl;
    url = 'documents';

    constructor(@Inject(LOCALE_ID) private locale: string, private dataService: DataService) {}

    upload(
        entity: string,
        fileName: string,
        original: Blob,
        thumb: Blob,
        icon: Blob
    ): Promise<string> {
        fileName = this.appendTimeStamp(fileName);
        const formData = new FormData();
        formData.append(fileName, original, fileName);
        formData.append(fileName, thumb, this.appendThumb(fileName));
        formData.append(fileName, icon, this.appendIcon(fileName));

        return this.dataService
            .post<string>(this.url + '/' + entity, formData)
            .toPromise()
            .then(key => {
                return key;
            });
    }

    getURL(key: string): string {
        return this.docUrl + key;
    }

    getThumbURL(key: string): string {
        return this.docUrl + this.appendThumb(key);
    }

    getIconURL(key: string): string {
        return this.docUrl + this.appendIcon(key);
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
