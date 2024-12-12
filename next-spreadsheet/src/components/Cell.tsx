import { Cellcontent } from "@/types/spreadsheet";
import React, { useEffect, useState } from "react";

interface Props {
  content: Cellcontent;
  onChange: (updated: Cellcontent) => void;
}

function evaluateFormula(formula: string): string | number {
  try {
    // "="を除去
    const expression = formula.slice(1).trim();

    // 基本的な数学演算子をサポート
    const operators = ["+", "-", "*", "/"];
    const parts = expression.split(new RegExp(`(${operators.join("|")})`));

    if (parts.length === 3) {
      const left = parseFloat(parts[0]);
      const operator = parts[1];
      const right = parseFloat(parts[2]);

      if (!isNaN(left) && !isNaN(right)) {
        switch (operator) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            return right !== 0 ? left / right : "Error: Division by zero";
        }
      }
    }

    // 単純な数値の場合
    const result = parseFloat(expression);
    return !isNaN(result) ? result : "Invalid Formula";
  } catch (error) {
    return "Error in Formula";
  }
}

export default function Cell({ content: initialContent, onChange }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [content, setContent] = useState<Cellcontent>(initialContent);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Escape"].includes(event.key)) {
      setEditing(false);
      setContent(initialContent);
    }

    if (event.key === "Enter") {
      onChange(content);
    }
  };

  function evaluateFormula(formula: string): string | number {
    try {
      // "="を除去
      const expression = formula.slice(1).trim();

      // 基本的な数学演算子をサポート
      const operators = ["+", "-", "*", "/"];
      const parts = expression.split(new RegExp(`(${operators.join("|")})`));

      if (parts.length === 3) {
        const left = parseFloat(parts[0]);
        const operator = parts[1];
        const right = parseFloat(parts[2]);

        if (!isNaN(left) && !isNaN(right)) {
          switch (operator) {
            case "+":
              return left + right;
            case "-":
              return left - right;
            case "*":
              return left * right;
            case "/":
              return right !== 0 ? left / right : "Error: Division by zero";
          }
        }
      }

      // 単純な数値の場合
      const result = parseFloat(expression);
      return !isNaN(result) ? result : "Invalid Formula";
    } catch (error) {
      return "Error in Formula";
    }
  }

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <td onClick={() => setEditing(!editing)}>
      {editing ? (
        <input
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : content.toString().startsWith("=") ? ( //ここがよくわからない
        evaluateFormula(content.toString())
      ) : (
        initialContent
      )}
    </td>
  );
}
