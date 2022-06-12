const mongoose = require("mongoose");
const db = require("../models");
const { county: County } = db;

exports.allCounty = (req, res, next) => {
  County.find()
    .select("title description countyPlaces _id")
    .populate("countyPlaces")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        counties: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            countyPlaces: doc.countyPlaces,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/county/" + doc._id
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

exports.createCounty = (req, res, next) => {
  const county = new County({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    countyPlaces: req.body.countyPlaces,
  });
  county
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created county successfully",
        createdCounty: {
          title: result.title,
          description: result.description,
          countyPlaces: result.countyPlaces,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/county/" + result._id
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

exports.getCounty = (req, res, next) => {
  const id = req.params.countyId;
  County.findById(id)
    .select("title description _id countyPlaces")
    .populate("countyPlaces")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          county: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/county/all"
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

exports.updateCounty = (req, res, next) => {
  const id = req.params.countyId;
  const updateObject = req.body;

  County.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "County updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/county/" + id
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

exports.deleteCounty = (req, res, next) => {
  const id = req.params.countyId;
  County.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "County deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/county/all",
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