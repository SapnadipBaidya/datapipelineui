// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useTheme } from '@emotion/react';
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const theme = useTheme();
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={theme.customStyles.node}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
