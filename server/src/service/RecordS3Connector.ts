import {FeedMeta} from '../models/record.model';
import axios from 'axios';
import ReadableStream = NodeJS.ReadableStream;

import s3Connection from '../connections/s3-connection.provider';

class RecordS3Connector {
    private getReadableStreamFromUrl = (url: string): Promise<ReadableStream> => {
        return axios.get<ReadableStream>(url, {responseType: 'stream'})
            .then(response => {
                return response.data;
            });
    };

    readFileFromUrl = async (url: string, fileName: string, prefixPath: string[]) => {
        return this.getReadableStreamFromUrl(url)
            .then(stream => s3Connection.uploadFile(fileName, stream, prefixPath));
    };


    recordUrl = async (id: string, feedMeta: FeedMeta, step: number): Promise<void> => {
        const prefixPath = [id];
        const fileName = `${step}-${feedMeta.fileName}`;
        try {
            await this.readFileFromUrl(feedMeta.feedUrl, fileName, prefixPath);
        } catch (e){
            console.log(e)
        }
    };
}

export const recordS3Connector = new RecordS3Connector();