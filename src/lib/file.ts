import * as fse from 'fs-extra';
import { Logger } from '@serverless-devs/core';


export async function writeStrToFile(targetFile: string, content: string, flags?: string, mode?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const ws = fse.createWriteStream(targetFile, { flags, mode });
    ws.write(JSON.stringify(content));
    ws.end();
    ws.on('finish', () => resolve());
    ws.on('error', (error) => {
      Logger.error(`${targetFile} write error: ${error}`, { context: 'FC-BASE' });
      reject(error);
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
