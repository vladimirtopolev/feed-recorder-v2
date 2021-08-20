import config from 'config';
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = config.get<string>('CONNECTIONS.MONGODB.URL');
const MONGODB_DB_NAME = config.get<string>('CONNECTIONS.MONGODB.DB_NAME');

mongoose.set('toJSON', { virtuals: true });
mongoose.set('toObject', { virtuals: true });

class MongoConnectionProvider {
    private mongoClient: Mongoose;

    connect(): Promise<Mongoose | void> {
        console.info('[MongoConnectionProvider] StartUp MongoDB connection');

        const options = {
            dbName: MONGODB_DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };

        mongoose.connection.on('connected', () => {
            console.info(`[MongoConnectionProvider] MongoDB connection set up successfully ${MONGODB_URL}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.error('[MongoConnectionProvider] MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`[MongoConnectionProvider] ${String(err)}`);
            if (err.name === 'MongoNetworkError') {
                setTimeout(function () {
                    mongoose.connect(MONGODB_URL, options);
                }, 5000);
            }
        });

        return mongoose.connect(MONGODB_URL, {
            dbName: MONGODB_DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    close(): Promise<void> {
        return this.mongoClient.connection.close();
    }
}

export default new MongoConnectionProvider();
