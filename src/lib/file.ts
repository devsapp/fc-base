import * as fse from 'fs-extra';
import { lock, unlockSync } from 'proper-lockfile';

export async function writeStrToFile(targetFile: string, content: string, flags?: string, mode?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    fse.ensureFileSync(targetFile);
    lock(targetFile)
      .then(() => {
        const ws = fse.createWriteStream(targetFile, { flags, mode });
        ws.write(content);
        ws.end();
        ws.on('finish', () => {
          unlockSync(targetFile);
          resolve();
        });
        ws.on('error', (error) => {
          unlockSync(targetFile);
          reject(error);
        });
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export async function isFile(inputPath: string): Promise<boolean> {
  const stats = await fse.lstat(inputPath);
  return stats.isFile();
}

export async function isDir(inputPath) {
  const stats = await fse.lstat(inputPath);
  return stats.isDirectory();
}
