const validateImg = (req, res, next) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
		return res.status(400).json({ message: "No images were uploaded." });
	}

	next();
};

module.exports = {
	validateImg,
};
