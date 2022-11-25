const JobService = require("../../job/service/Job");
const JobItemService = require("../../job-item/service/JobItem");
const MongoClient = require("mongodb").MongoClient;
const { PAGINATION_LIMIT } = require("../../../config/index");

//
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
//
class ClonerService {
  get(jobId) {
    return JobService.findById(jobId);
  }
  async save(cloner) {
    const job = await JobService.create({
      sourceEnvironment: ObjectId("62459d83bf59719b8be91786"),
      targetEnvironment: ObjectId("62459d77bf59719b8be91785"),
    });

    async function main({ source, target, ignoreList = [] }) {
      const sourceConnection = await MongoClient.connect(source.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const targetConnection = await MongoClient.connect(target.connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const sourceDB = sourceConnection.db(source.dbName);
      const targetDB = targetConnection.db(target.dbName);

      if (target.reCreate) {
        targetDB.dropDatabase();
      }

      const sourceCollections = await sourceDB.listCollections().toArray();
      const filteredCollections = sourceCollections.filter((sc) => {
        if (!ignoreList || ignoreList.length == 0) {
          return true;
        }

        for (const il of ignoreList) {
          if (il.startsWith("*")) {
            const searchForEndsWith = il.substr(1);
            if (sc.name.endsWith(searchForEndsWith)) {
              return false;
            }
          }

          if (il.endsWith("*")) {
            const searchForStartsWith = il.substr(0, il.indexOf("*"));
            if (sc.name.startsWith(searchForStartsWith)) {
              return false;
            }
          }

          if (il == sc.name) {
            return false;
          }
        }

        return true;
      });

      console.log("===============Liste Başlangıç=======================");
      console.log(
        "Kopyalanacak Collection Listesi",
        filteredCollections.map((a) => a.name)
      );
      console.log("=================Liste Bitiş=========================");

      let anyError = false;

      await Promise.all(
        filteredCollections.map(async (c) => {
          let totalCollectionData = 0;
          let page = 0;
          const targetCollection = targetDB.collection(c.name);

          await JobItemService.create({
            collectionName: c.name,
            message: c.name + " Kopyalanıyor...",
            type: "info",
            job,
          });
          do {
            const data = await sourceDB
              .collection(c.name)
              .find({})
              .skip(PAGINATION_LIMIT * page)
              .limit(PAGINATION_LIMIT)
              .toArray();

            if (data && data.length > 0) {
              try {
                await targetCollection.insertMany(data);
                totalCollectionData += data.length;
              } catch (error) {
                console.log(error);
                anyError = true;
                await JobItemService.create({
                  collectionName: c.name,
                  message: c.name + " Hata",
                  error: error.message,
                  type: "error",
                  job,
                });
              }
            } else {
              break;
            }
            page++;
          } while (true);

          await JobItemService.create({
            collectionName: c.name,
            message: c.name + " (" + totalCollectionData + ")" + " kopyalandı!",
            type: "info",
            job,
          });
        })
      );

      job.end = new Date();
      job.status = "done";
      job.anyError = anyError;

      await JobService.update(job);
    }

    main({
      source: {
        connection: cloner.source.connection,
        dbName: cloner.source.dbName,
      },
      target: {
        connection: cloner.target.connection,
        dbName: cloner.target.dbName,
        reCreate: cloner.target.reCreate,
      },
      ignoreList: cloner.ignoreList,
    });
    return { job };
  }
}

module.exports = new ClonerService();
