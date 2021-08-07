const Sauce = require("../models/Sauce");
const fs = require('fs');                 // "file system" allows us to manage the downloading of images

// returns all registered sauces in database
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


// returns a given sauce from databse using the sauce id in URL
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

//  creates a new sauce in database using the request body and the file in the request to store the image
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// edits an existing sauce in the database
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? 
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// deletes a sauce from database
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {                 // "file system" method to delete an image
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch( error => res.status(500).json({ error }));
};

// allows the user to like or dislike a sauce 
exports.rateSauce = (req, res, next) => {
  let like = req.body.like                  // gets the value of like grom the request  ( 1 is like 0, for none, -1 for dislike)
  let userId = req.body.userId
  let sauceId = req.params.id
    
  switch (like) { 
    case 1 :                                  // case of a like
        Sauce.updateOne({ _id: sauceId }, 
          { $push: { usersLiked: userId },    // adds the userId to the list of user that liked the sauce (unables the user to like this sauce another time)
            $inc: { likes: +1 }})             // adds one to the like counter
          .then(() => res.status(200).json({ message: `J'aime` }))
          .catch((error) => res.status(400).json({ error }))
            
      break;

    case 0 :                                  // case of a user that already liked or disliked a sauce and cancels his vote
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {              // if the user previously liked the sauce
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})  // removes the userId from the userlist and substracts 1 to like counter
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) {            // if the user previously disliked the sauce
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId },   // removes the userId from the userlist and substracts 1 to dislike counter
                    $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;

    case -1 :                     // case of a dislike
        Sauce.updateOne({ _id: sauceId }, { 
          $push: { usersDisliked: userId },   // adds the userId to the list of user that disliked the sauce (unables the user to dislike this sauce another time)
          $inc: { dislikes: +1 }})             // adds one to the dislike counter
          .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
          .catch((error) => res.status(400).json({ error }))
      break;
      
      default:
        console.log(error);
  }
};