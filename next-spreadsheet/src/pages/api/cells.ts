//APIエンドポイント：クライアントがサーバーと通信するための特定のURL

import { Cellcontent } from "@/types/spreadsheet";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

//APIが返すデータの型
//なぜinterfaceではない？
type Data = {
  cells?: Array<Array<Cellcontent>>;
};

//一時的なストレージ：なぜ？
// const storage = { cells: undefined };

//データがファイルへ保存される
const PATH = "db.json";

export default function handler(
  req: NextApiRequest, //APIへリクエスト（クライアントからサーバー）
  res: NextApiResponse<Data> //APIへレスポンス（サーバーからクライアント）
) {
  const { method } = req; //HTTPメソッドを取り出す

  //   switch (method) {
  //     case "GET": //ストレージのデータを取得
  //       res.status(200).json(storage);
  //       break;
  //     case "POST": //データ保存
  //       const { cells } = req.body; //サーバーへ送りたいデータ全て
  //       storage.cells = cells; //データを保存
  //       res.status(200).json({});
  //       break;
  //     default: //その他のメソッド処理
  //       break;
  //   }
  
  switch (method) {
    case "GET":
      if (fs.existsSync(PATH)) {
        const content = fs.readFileSync(PATH, "utf-8");
        const data = JSON.parse(content);
        res.status(200).json(data);
      } else {
        res.status(200).json({});
      }
      break;
    case "POST":
      const { cells } = req.body;
      const data = JSON.stringify({ cells });
      fs.writeFileSync(PATH, data, "utf-8");
      res.status(200).json({});
      break;
    default:
      break;
  }
}
