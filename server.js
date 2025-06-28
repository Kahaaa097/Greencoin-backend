import express from "express";
import cors from "cors";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// API kiểm tra ảnh minh chứng có trùng không
app.post("/check-image", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString("base64");

    // 🟡 Mô phỏng kiểm tra hình ảnh (ở đây mặc định là "unique": true)
    const result = { unique: true };

    fs.unlinkSync(filePath); // Xoá ảnh sau khi xử lý
    res.json(result);
  } catch (err) {
    console.error("❌ Lỗi khi kiểm tra hình ảnh:", err);
    res.status(500).json({ error: "Lỗi xử lý ảnh" });
  }
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API server chạy tại http://localhost:${PORT}`);
});
