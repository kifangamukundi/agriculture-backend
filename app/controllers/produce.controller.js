const mongoose = require("mongoose");
const db = require("../models");
const { produce: Produce } = db;

exports.allProduce = (req, res, next) => {
  Produce.find()
    .select("title description progress product _id")
    .populate("progress")
    .populate("product")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        produces: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            progress: doc.progress,
            product: doc.product,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/produce/" + doc._id
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

exports.createProduce = (req, res, next) => {
  const produce = new Produce({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    progress: req.body.progress,
    product: req.body.product,
  });
  produce
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created produce successfully",
        createdProduce: {
          title: result.title,
          description: result.description,
          progress: result.progress,
          product: result.product,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/produce/" + result._id
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

exports.getProduce = (req, res, next) => {
  const id = req.params.produceId;
  Produce.findById(id)
    .select("title description _id progress product")
    .populate("progress")
    .populate("product")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          produce: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/produce/all"
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

exports.updateProduce = (req, res, next) => {
  const id = req.params.produceId;
  const updateObject = req.body;

  Produce.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Produce updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/produce/" + id
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

exports.deleteProduce = (req, res, next) => {
  const id = req.params.produceId;
  Produce.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Produce deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/produce/all",
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