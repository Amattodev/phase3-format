import { Cellcontent } from "@/types/spreadsheet";
import React, { useState } from "react";

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
    }

    if (event.key === "Enter") {
      onChange(content);
    }
  };

  return (
    <td onClick={() => setEditing(!editing)}>
      {editing ? (
        <input
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        content
      )}
    </td>
  );
}
