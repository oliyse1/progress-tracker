const router = require("express").Router();
let Action = require("../models/action.model");

router.route("/").get((req, res) => {
  Action.find()
    .then((actions) => res.json(actions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const client = req.body.client;
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const startdate = Date.parse(req.body.startdate);
  const enddate = Date.parse(req.body.enddate);

  const newAction = new Action({
    username,
    client,
    title,
    status,
    startdate,
    enddate,
  });

  newAction
    .save()
    .then(() => res.json("Action added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Action.findById(req.params.id)
    .then((algo) => res.json(algo))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Action.findByIdAndDelete(req.params.id)
    .then(() => res.json("Action deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Action.findById(req.params.id)
    .then((action) => {
      action.username = req.body.username;
      action.client = req.body.client;
      action.title = req.body.title;
      action.status = req.body.status;
      action.startdate = Date.parse(req.body.startdate);
      action.enddate = Date.parse(req.body.enddate);

      action
        .save()
        .then(() => res.json("Action updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
