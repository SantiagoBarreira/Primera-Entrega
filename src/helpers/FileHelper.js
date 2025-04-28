// const fs = require("fs/promises");
import fs from "fs/promises"
class FileHelper {
  
  static async writeJSON(path, data) {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }

  static async readJSON(path) {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

export default FileHelper;