import path from 'path';
import fs from 'fs/promises';
import { promisify } from 'util';
import sharp from 'sharp';

const readFile = promisify(fs.readFile);



const THRESHOLD = 0.1;

export default async function checkExistingImage(req, res, next) {

  let imageCounter = 0;
  let buffer;

  try {
    if (req.files.img) {
      const uploadedImage = req.files.img[0];
      const images = await fs.readdir('public/blogImages')

      for (const image of images) {

        const imagePath = path.join('public/blogImages', image);
        
console.log('Image path:', imagePath)

        const isMatch = await compareImageContent(uploadedImage.path, imagePath);

console.log('Match: ' + isMatch)

        if (isMatch && imageCounter > 1) {
console.log('Image Exists')
          // Update filename and set flag
          req.existingImage = true;
          req.imageFilename = buffer;
console.log('buffer: ', buffer)
          // Delete the recently uploaded image
          const oldPath = path.join('public/blogImages', uploadedImage.filename)
console.log('oldPath: ', oldPath)
          await fs.promises.rm(uploadedImage.path, { force: true });

          break; 

        } else if (isMatch && imageCounter < 2) {
          buffer = image;
          imageCounter++;
console.log('Counter: ', imageCounter)
        }
      }
    }

    
    next();

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function compareImageContent (path1, path2) {
  try {
    const base64Image1 = await imageToBase64(path1);
    const base64Image2 = await imageToBase64(path2);

    // Compare base64-encoded images
    const diff = await compareBase64Images(base64Image1, base64Image2);

    return diff < THRESHOLD;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function imageToBase64 (filePath) {
  const buffer = await sharp(filePath).toBuffer();
  return buffer.toString('base64');
}

async function compareBase64Images (base64Image1, base64Image2) {
  return base64Image1 === base64Image2 ? 0 : 1;
}
