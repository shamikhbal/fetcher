import fs from "fs";
import path from "path";
import { FilePicker } from "../lib/index";

describe("FilePicker", () => {
  describe("getSync()", () => {
    it("should return a File object with the correct file name and MIME type", () => {
      const filePath = "test.txt";
      const fileBuffer = Buffer.from("Hello World!");
      fs.writeFileSync(filePath, fileBuffer);

      const file = FilePicker.getSync(filePath);
      expect(file.name).toBe(path.basename(filePath));
      expect(file.type).toBe("text/plain");

      fs.unlinkSync(filePath);
    });

    it("should throw an error if the file does not exist", () => {
      const filePath = "non-existent-file.txt";

      expect(() => FilePicker.getSync(filePath)).toThrowError(
        `Failed to read file: ENOENT: no such file or directory, open '${filePath}'`
      );
    });
  });

  describe("get()", () => {
    it("should return a Promise that resolves to a File object with the correct file name and MIME type", async () => {
      const filePath = "test.txt";
      const fileBuffer = Buffer.from("Hello World!");
      fs.writeFileSync(filePath, fileBuffer);

      const file = await FilePicker.get(filePath);
      expect(file.name).toBe(path.basename(filePath));
      expect(file.type).toBe("text/plain");

      fs.unlinkSync(filePath);
    });

    it("should throw an error if the file does not exist", async () => {
      const filePath = "non-existent-file.txt";

      await expect(FilePicker.get(filePath)).rejects.toThrowError(
        `Failed to read file: ENOENT: no such file or directory, open '${filePath}'`
      );
    });
  });
});
