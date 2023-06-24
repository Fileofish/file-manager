import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import fs from 'fs';
import zlib from 'zlib';
import crypto from 'crypto';
import path from 'path';

export class Archiver {
  constructor() {
    this.fileHashes = {};
  }

  compressFile(sourcePath, destinationDirPath) {
    try {
      const fileExtension = path.extname(sourcePath);
      const fileName = path.basename(sourcePath, fileExtension);
      const destinationPath = path.join(destinationDirPath, `${fileName}.br`);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliStream = zlib.createBrotliCompress();

      readStream.pipe(brotliStream).pipe(writeStream);

      readStream.on('end', () => {
        console.log(`File '${path.basename(sourcePath)}' compression is complete.`);
      });

      writeStream.on('finish', () => {
        console.log(`The compressed data is written to a file '${destinationPath}'.`);
        showCurrentFolder();
        const hash = this.getFileHash(destinationPath);
        this.fileHashes[hash] = fileExtension;
      });

      brotliStream.on('error', (error) => {
        throw new Error('Data compression error: ' + error.message);
      });
  
      writeStream.on('error', (error) => {
        throw new Error('Error writing compressed data: ' + error.message);
      });
    } catch (error) {
      console.error('Compression error:', error);
    }
  }

  decompressFile(sourcePath, destinationDirPath) {
    try {
      const fileExtension = path.extname(sourcePath);
      const fileName = path.basename(sourcePath, fileExtension);
      const hash = this.getFileHash(sourcePath);
      const extension = this.fileHashes[hash];
      const destinationPath = path.join(destinationDirPath, `${fileName}.${extension}`);

      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);
      const brotliStream = zlib.createBrotliDecompress();

      readStream.pipe(brotliStream).pipe(writeStream);

      readStream.on('end', () => {
        console.log(`Unpacking of the file '${path.basename(sourcePath)}' is completed.`);
      });

      writeStream.on('finish', () => {
        console.log(`The unpacked data is written to a file '${destinationPath}'.`);
      });

      brotliStream.on('error', (error) => {
        throw new Error('Data decompression error: ' + error.message);
      });
  
      writeStream.on('error', (error) => {
        throw new Error('Error writing unpacked data: ' + error.message);
      });
    } catch (error) {
      console.error('Decompression error:', error);
    }
  }

  async getFileHash(filePath) {
    try {
      const fileData = await fs.promises.readFile(filePath);
      const hash = crypto.createHash('md5').update(fileData).digest('hex');
      return hash;
    } catch (error) {
      throw new Error('Error calculating file hash: ' + error.message);
    }
  }
}