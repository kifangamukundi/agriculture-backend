const mongoose = require("mongoose");
const db = require("../models");
const { collectionCenter: CollectionCenter } = db;

exports.allCollectionCenter = (req, res, next) => {
  CollectionCenter.find()
    .select("title description size _id isFull")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        collectioncenters: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            size: doc.size,
            isFull: doc.isFull,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/collectionCenter/" + doc._id
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

exports.createCollectionCenter = (req, res, next) => {
  const center = new CollectionCenter({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    size: req.body.size,
    isFull: req.body.isFull,
  });
  center
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created collection center successfully",
        createdCenter: {
          title: result.title,
          description: result.description,
          size: result.size,
          isFull: result.isFull,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/collectionCenter/" + result._id
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

exports.getCollectionCenter = (req, res, next) => {
  const id = req.params.collectionCenterId;
  CollectionCenter.findById(id)
    .select("title description _id size, isFull")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          collectioncenter: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/collectionCenter/all"
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

exports.updateCollectionCenter = (req, res, next) => {
  const id = req.params.collectionCenterId;
  const updateObject = req.body;

  CollectionCenter.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection Center updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/collectionCenter/" + id
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

exports.deleteCollectionCenter = (req, res, next) => {
  const id = req.params.collectionCenterId;
  CollectionCenter.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Collection center deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/collectionCenter/all",
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