import { Cellcontent } from "@/types/spreadsheet";
import React, { useEffect, useState } from "react";

interface Props {
  content: Cellcontent;
  onChange: (updated: Cellcontent) => void;
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

  //計算処理
  const evaluateFormula = (exp: string) => {
    const sanitized = exp.slice(1).replace(/[^\=\+\-\*%/0-9]/g, "");
    return eval(sanitized);
  };

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
      ) : content.toString().startsWith("=") ? (
        evaluateFormula(content.toString())
      ) : (
        initialContent
      )}
    </td>
  );
}
