import { Injectable } from '@angular/core';
import { ApiService } from '../../uilib/services/api.service';

@Injectable()
export class FileService {
    fileList = [];
    file = {
        uid: '',
        name: '',
        status: 'done',
        response: '{"status": "success"}',
        url: ''
    }

    constructor(
        private apiService: ApiService,
    ) { }

    transferFiles(data) {
        data.forEach(element => {
            this.file.uid = element.id;
            this.file.name = element.name;
            this.file.url = this.apiService.getFullHref(`appbiz/file2/${element.id}`);
            this.fileList.push(this.file);
        });
        return this.fileList;
    }

    transferFile(id: string, name: string) {
        this.file.uid = id;
        this.file.name = name;
        this.file.url = this.apiService.getFullHref(`appbiz/file2/${id}`);
        return this.file;
    }
}

