const sharp = require("sharp");

async function compressImage(inputPath, fileName, fileFormat) {
  return new Promise((resolve, reject) => {
    sharp(inputPath)  
      .resize({ width: 800 })
      .toFile(fileName + "-compressed" + fileFormat, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(fileName + "-compressed" + fileFormat);
        }
      });
  });
}

const compressImages = async (req, res, next) => {
  if (req.file) {
    const file = req.file;

    const { path } = file;
    const dotIndex = path.lastIndexOf(".");

    const fileName = path.substring(0, dotIndex);
    const fileFormat = path.substring(dotIndex).toLowerCase();

    try {
      const compressedFilePath = await compressImage(
        path,
        fileName,
        fileFormat
      );

      req.file.path = compressedFilePath;
    } catch (err) {
      return next(err);
    }

    next()
  }
};
module.exports = compressImages;
