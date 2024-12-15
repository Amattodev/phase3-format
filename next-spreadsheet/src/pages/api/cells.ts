//APIエンドポイント：クライアントがサーバーと通信するための特定のURL

import { Cellcontent } from "@/types/spreadsheet";
import type { NextApiRequest, NextApiResponse } from "next";

//APIが返すデータの型
//なぜinterfaceではない？
type Data = {
  cells?: Array<Array<Cellcontent>>;
};

//一時的なストレージ：なぜ？
const storage = { cells: undefined };

export default function handler(
  req: NextApiRequest, //APIへリクエスト（クライアントからサーバー）
  res: NextApiResponse<Data> //APIへレスポンス（サーバーからクライアント）
) {
  const { method } = req; //HTTPメソッドを取り出す

  switch (method) {
    case "GET": //ストレージのデータを取得
      res.status(200).json(storage);
      break;
    case "POST": //データ保存
      const { cells } = req.body; //サーバーへ送りたいデータ全て
      storage.cells = cells; //データを保存
      res.status(200).json({});
      break;
    default: //その他のメソッド処理
      break;
  }
}
