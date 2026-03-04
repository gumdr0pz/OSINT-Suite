import exifParser from 'exif-parser';
import fs from 'fs';

export async function extractMetadata(filePath: string) {
  try {
    const buffer = fs.readFileSync(filePath);
    const parser = exifParser.create(buffer);
    const result = parser.parse();
    
    const stats = fs.statSync(filePath);
    
    return {
      exif: result.tags,
      imageSize: result.getImageSize(),
      fileInfo: {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    };
  } catch (error) {
    throw new Error('Metadata extraction failed');
  }
}
