const checkError = (req, res, next) => {
  const keys = Object.keys(req.body);
  if (keys.some((key) => !req.body[key])) {
    return res
      .status(400)
      .json({ message: "Toutes les valeurs du formulaire sont obligatoires" });
  }
  if (isNaN(new Date(req.body["launchDate"]))) {
    return res.status(400).json({ message: "La date est invalide" });
  }
  next();
};

module.exports = checkError;
