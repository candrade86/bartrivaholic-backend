const Round = require("./roundModel.js");
const router = require("express").Router();

router.get("/get", (req, res) => {
  Round.find({})
    .then(round => {
      res.status(200).json(round);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/create-round", (req, res) => {
  const { gameId } = req.body;
  const {
    roundName,
    numberOfQuestions,
    category,
    difficulty,
    type,
    questions
  } = req.body.round;

  const round = new Round({
    gameId,
    roundName,
    numberOfQuestions,
    category,
    difficulty,
    type,
    questions
  });

  round
    .save()
    .then(inserted => {
      console.log("INSERTED", inserted);
      inserted.questions = req.body;
      res.status(201).json(inserted);
    })
    .catch(err => res.status(500).json(err));
});

router.put("/update-round", (req, res) => {
  const { roundId, round } = req.body;

  Round.findByIdAndUpdate(roundId, round, { new: true })
    .then(updated => {
      console.log("UPDATED", updated);
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json("Error updating the round", err);
    });
});

router.delete("/delete-round/:id", (req, res) => {
  console.log("inside delete RC", req.params);
  const { id } = req.params;

  Round.findByIdAndRemove(id)
    .then(removed => {
      console.log("removed", removed);
      res.status(200).json(removed);
    })
    .catch(err => {
      res.status(500).json(console.error("Error deleting round", error));
    });
});

module.exports = router;
