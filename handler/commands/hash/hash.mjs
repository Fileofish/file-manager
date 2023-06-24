import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import fs from 'fs/promises';
import crypto from 'crypto';

export async function getHashFile(filePath) {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
  const algorithm = 'sha256';
  const hash = crypto.createHash(algorithm);

  try {
    const fileData = await fs.readFile(filePath);
    const fileHash = hash.update(fileData).digest('hex');
    console.log(`Hash for file '${fileName}' is '${fileHash}'.`);
    showCurrentFolder();
  } catch (error) {
    throw error;
  }
}