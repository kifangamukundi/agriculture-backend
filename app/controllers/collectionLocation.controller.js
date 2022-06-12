const mongoose = require("mongoose");
const db = require("../models");
const { collectionLocation: CollectionLocation } = db;

exports.allCollectionLocation = (req, res, next) => {
  CollectionLocation.find()
    .select("title description collectionCenters _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        collectionlocations: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            collectionCenters: doc.collectionCenters,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/collectionLocation/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.createCollectionLocation = (req, res, next) => {
  const location = new CollectionLocation({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    collectionCenters: req.body.collectionCenters,
  });
  location
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Collection Location successfully",
        createdCollectionLocation: {
          title: result.title,
          description: result.description,
          collectionCenters: result.collectionCenters,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/collectionLocation/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.getCollectionLocation = (req, res, next) => {
  const id = req.params.collectionLocationId;
  CollectionLocation.findById(id)
    .select("title description _id collectionCenters")
    .populate("collectionCenters")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          collectionlocation: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/collectionLocation/all"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateCollectionLocation = (req, res, next) => {
  const id = req.params.collectionLocationId;
  const updateObject = req.body;

  CollectionLocation.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection Location updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/collectionLocation/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.deleteCollectionLocation = (req, res, next) => {
  const id = req.params.collectionLocationId;
  CollectionLocation.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection Location deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/collectionLocation/all",
          body: { title: "String", description: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};