const mongoose = require("mongoose");
const db = require("../models");
const { countyPlace: CountyPlace } = db;

exports.allCountyPlace = (req, res, next) => {
  CountyPlace.find()
    .select("title description _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        countyplaces: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/countyPlace/" + doc._id
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

exports.createCountyPlace = (req, res, next) => {
  const place = new CountyPlace({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });
  place
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created county Place successfully",
        createdCountyPlace: {
          title: result.title,
          description: result.description,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/countyPlace/" + result._id
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

exports.getCountyPlace = (req, res, next) => {
  const id = req.params.countyPlaceId;
  CountyPlace.findById(id)
    .select("title description _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          countyplace: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/countyPlace/all"
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

exports.updateCountyPlace = (req, res, next) => {
  const id = req.params.countyPlaceId;
  const updateObject = req.body;

  CountyPlace.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "County Place updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/countyPlace/" + id
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

exports.deleteCountyPlace = (req, res, next) => {
  const id = req.params.countyPlaceId;
  CountyPlace.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "County Place deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/countyPlace/all",
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