const mongoose = require("mongoose");
const db = require("../models");
const { category: Category } = db;

exports.allCategory = (req, res, next) => {
  Category.find()
    .select("title description categoryImage _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        categories: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            categoryImage: doc.categoryImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8080/api/category/" + doc._id
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

exports.createCategory = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    // categoryImage: req.file.path,
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created category successfully",
        createdCategory: {
          title: result.title,
          description: result.description,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/category/" + result._id
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

exports.getCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
    .select("title description _id categoryImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          category: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/api/category/all"
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

exports.updateCategory = (req, res, next) => {
  const id = req.params.categoryId;
  const updateObject = req.body;

  Category.updateOne({_id: id}, {$set: updateObject})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category updated",
        request: {
          type: "GET",
          url: "http://localhost:8080/api/category/" + id
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

exports.deleteCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category deleted",
        request: {
          type: "POST",
          url: "http://localhost:8080/api/category/all",
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