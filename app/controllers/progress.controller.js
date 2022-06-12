const mongoose = require("mongoose");
const db = require("../models");
const { progress: Progress } = db;

exports.allProgress = (req, res, next) => {
  Progress.find()
    .select("shortDescription longDescription expense income _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        progresses: docs.map(doc => {
          return {
            shortDescription: doc.shortDescription,
            longDescription: doc.longDescription,
            expense: doc.expense,
            income: doc.income,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/progress/" + doc._id
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

exports.createProgress = (req, res, next) => {
  const progress = new Progress({
    _id: new mongoose.Types.ObjectId(),
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    expense: req.body.expense,
    income: req.body.income,
  });
  progress
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created progress successfully",
        createdProgress: {
          shortDescription: result.shortDescription,
          longDescription: result.longDescription,
          expense: result.expense,
          income: result.income,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/progress/" + result._id
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

exports.getProgress = (req, res, next) => {
  const id = req.params.progressId;
  Progress.findById(id)
    .select("shortDescription longDescription _id expense income")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          progress: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/progress/all"
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

exports.updateProgress = (req, res, next) => {
  const id = req.params.progressId;
  const updateObject = req.body;

  Progress.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Progress updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/progress/" + id
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

exports.deleteProgress = (req, res, next) => {
  const id = req.params.progressId;
  Progress.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Progress deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/progress/all",
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