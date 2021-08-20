import AWS, {S3} from 'aws-sdk';
import config from 'config';
import stream from 'stream';
import {PutObjectOutput, PutObjectRequest} from 'aws-sdk/clients/s3';
import ReadableStream = NodeJS.ReadableStream;

class S3ConnectionProvider {
    private s3: S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: config.get<string>('CONNECTIONS.S3.accessKeyId'),
            secretAccessKey: config.get<string>('CONNECTIONS.S3.secretAccessKey'),
            signatureVersion: 'v4'
        });
    }

    async connect(): Promise<void> {
        const options = {
            Bucket: config.get<string>('CONNECTIONS.S3.bucket')
        };

        try {
            await this.s3.headBucket(options).promise();
            console.info('[S3ConnectionProvider][connect] Connection is available');
        } catch (error) {
            console.error('[S3ConnectionProvider][connect] Problems with s3 connection');
            throw error;
        }
    }

    close(): Promise<void> {
        return Promise.resolve();
    }


    getObjectStream(key: string, folders: string[] = []): stream.Readable {
        return this.s3
            .getObject({
                Bucket: config.get<string>('CONNECTIONS.S3.bucket'),
                Key: [...folders, key].join('/')
            })
            .createReadStream();
    }

    uploadFile(key: string, readableStream: ReadableStream, folders: string[] = []): Promise<PutObjectOutput> {
        const putObjectRequest: PutObjectRequest = {
            Bucket: config.get<string>('CONNECTIONS.S3.bucket'),
            Key: [...folders, key].join('/'),
            Body: readableStream
        };
        return this.s3.upload(putObjectRequest).promise();
    }

}


export default new S3ConnectionProvider();
