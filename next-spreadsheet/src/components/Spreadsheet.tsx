import { useEffect, useState } from "react";
import Cell from "./Cell";
import { Cellcontent } from "@/types/spreadsheet";

export default function Spreadsheet() {
  const [cellContents, setCellContents] = useState<Array<Array<Cellcontent>>>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ]);

  const persist = () => {
    //ローカルストレージによるリクエスト
    // const data = JSON.stringify(cellContents);
    // window.localStorage.setItem("cells", data);
    //エンドポイントを呼び出したもの
    fetch("/api/cells", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ cells: cellContents }),
    });
  };

  useEffect(() => {
    //ローカルストレージによるリクエスト
    // const persistedData = window.localStorage.getItem("cells");
    // if (persistedData) {
    //   setCellContents(JSON.parse(persistedData));
    // }
    //エンドポイントを呼び出したもの
    fetch("/api/cells").then((res) =>
      res.text().then((s) => {
        const data = JSON.parse(s);
        if (data.cells) {
          setCellContents(data.cells);
        }
      })
    );
  }, []);

  return (
    <>
      <p>ここにスプレッドシートを作成します。</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            {cellContents[0].map((cell, i) => (
              <th>{String.fromCharCode(65 + i)}</th>
            ))}
          </tr>
          {cellContents.map((row, rowIndex) => {
            console.log(cellContents);
            return (
              <tr>
                <th>{rowIndex + 1}</th>
                {row.map((cell, cellIndex) => (
                  <Cell
                    content={cell}
                    onChange={(updated: Cellcontent) => {
                      const updatedCellContents = [...cellContents];
                      updatedCellContents[rowIndex][cellIndex] = updated;
                      setCellContents(updatedCellContents);
                    }}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          setCellContents([
            ...cellContents,
            Array(cellContents[0].length).fill(0),
          ]);
        }}
      >
        + 行
      </button>
      <button
        onClick={() => {
          setCellContents(cellContents.slice(0, -1));
        }}
      >
        - 行
      </button>
      <br />
      <button
        onClick={() => setCellContents(cellContents.map((row) => [...row, 0]))}
      >
        + 列
      </button>
      <button
        onClick={() =>
          setCellContents(cellContents.map((row) => row.slice(0, -1)))
        }
      >
        - 列
      </button>
      <br />
      <button onClick={persist}>Save</button>
    </>
  );
}
