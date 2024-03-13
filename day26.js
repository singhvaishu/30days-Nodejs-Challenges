const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';


const dbName = 'your_database_name';

async function getProductStatistics() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection('products');

        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    highestQuantity: { $max: '$quantity' }
                }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        return result[0];
    } finally {
        await client.close();
    }
}

async function main() {
    try {
        const productStats = await getProductStatistics();
        console.log('Product Statistics:', productStats);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
