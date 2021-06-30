const path = require("path");
const moment = require("moment");

const uploadImg = (imgs, folder = "") => {
	return new Promise((resolve, reject) => {
		const { image } = imgs;
		const nameSplit = image.name.split(".");
		const extension = nameSplit[nameSplit.length - 1];

		const validExtensions = ["png", "jpg", "jpeg", "gif", "svg"];
		if (!validExtensions.includes(extension))
			return reject(
				`Extension is not allowed. The valid extensions are ${validExtensions}`
			);

		const nameImg = moment().unix() + "." + extension;
		uploadPath = path.join(__dirname, "../uploads/", folder, nameImg);

		image.mv(uploadPath, (err) => {
			if (err) return reject(err);

			resolve(nameImg);
		});
	});
};

const allowedCollections = (collection = " ", collections = []) => {
	return new Promise((resolve, reject) => {
		const allowed = collections.includes(collection);
		if (!allowed)
			reject(
				`Collection is not allowed. The allowed colections are ${collections}`
			);
		resolve(true);
	});
};

module.exports = {
	uploadImg,
	allowedCollections,
};
