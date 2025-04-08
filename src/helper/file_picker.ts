import fs from "fs";
import path from "path";
import { mimeTypes } from "../constants/mime-db";

class FilePicker {
  public static getSync(filePath: string): File {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      const mimeType = this.getMimeType(filePath) || "application/octet-stream";

      return new File([fileBuffer], fileName, {
        type: mimeType.toString(),
      });
    } catch (error: any) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  public static async get(filePath: string): Promise<File> {
    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      const fileName = path.basename(filePath);
      const mimeType = this.getMimeType(filePath) || "application/octet-stream";

      return new File([fileBuffer], fileName, {
        type: mimeType.toString(),
      });
    } catch (error: any) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  private static getMimeType(filePath: string): string {
    const ext = filePath.split(".").pop()?.toLowerCase();
    if (!ext || ext === filePath.toLowerCase()) {
      throw new Error(`File not found or has no extension: ${filePath}`);
    }

    return mimeTypes[ext] || "application/octet-stream";
  }
}

export default FilePicker;
