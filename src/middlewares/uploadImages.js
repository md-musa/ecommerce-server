const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async file =>
  new Promise(resolve => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send('upload image error');
      resolve({
        res: res.url,
      });
    });
  });

const uploadImages = async (req, res, next) => {
  const data = req.files.images.map(
    async file => await uploadImageToCloudinary(file.tempFilePath)
  );

  Promise.all(data).then(result => {
    const urls = result.map(item => item.res);

    req.body.images = urls;
    next();
    // res.send(urls);
  });
};

module.exports = uploadImages;
