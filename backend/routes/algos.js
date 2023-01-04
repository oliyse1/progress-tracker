const router = require("express").Router();
let Algo = require("../models/algo.model");

router.route("/").get((req, res) => {
  Algo.find()
    .then((algos) => res.json(algos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newAlgo = new Algo({
    username,
    title,
    description,
    duration,
    date,
  });

  newAlgo
    .save()
    .then(() => res.json("Algo added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Algo.findById(req.params.id)
    .then((algo) => res.json(algo))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Algo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Algo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Algo.findById(req.params.id)
    .then((algo) => {
      algo.username = req.body.username;
      algo.title = req.body.title;
      algo.description = req.body.description;
      algo.duration = Number(req.body.duration);
      algo.date = Date.parse(req.body.date);

      algo
        .save()
        .then(() => res.json("Algo updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
