import {FeedMeta, FeedMetaDocument} from '../models/record.model';
import fs from 'fs-extra';
import axios from 'axios';
import ReadableStream = NodeJS.ReadableStream;

class RecordFileSystemConnector {
    private getReadableStreamFromUrl = (url: string): Promise<ReadableStream> => {
        return axios.get<ReadableStream>(url, {responseType: 'stream'})
            .then(response => {
                return response.data;
            });
    };

    createFile = (fileName: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            fs.appendFile(fileName, '', (err) => {
                if (err) {
                    reject();
                }
                resolve();
            });
        });
    };

    readFileFromUrl = async (url: string, fileName: string, prefixPath: string[]) => {
        await fs.ensureDir(['.', ...prefixPath].join('/'));
        await this.createFile(['.', ...prefixPath, fileName].join('/'));
        return this.getReadableStreamFromUrl(url)
            .then(stream => stream.pipe(fs.createWriteStream(['.', ...prefixPath, fileName].join('/'))));
    };


    recordUrl = async (id: string, feedMeta: FeedMeta, step: number): Promise<void> => {
        const prefixPath = ['source', id];
        const fileName = `${step}-${feedMeta.fileName}`;
        await this.readFileFromUrl(feedMeta.feedUrl, fileName, prefixPath);
    };
}

export const recordFileSystemConnector = new RecordFileSystemConnector();