import { useState } from "react";
import Cell from "./Cell";
import { Cellcontent } from "@/types/spreadsheet";

export default function Spreadsheet() {
  const [cellContents, setCellContents] = useState<Array<Array<Cellcontent>>>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ]);

  return (
    <>
      <p>ここにスプレッドシートを作成します。</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
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
    </>
  );
}
