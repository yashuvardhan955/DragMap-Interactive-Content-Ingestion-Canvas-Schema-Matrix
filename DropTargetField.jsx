import React, { useState } from 'react';

export default function DropTargetField({ schemaKey, pairedSourceField, onDropElement, onClearElement }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const isLinked = !!pairedSourceField;

  const handleDragEnterRule = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeaveRule = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDroppedValueAction = (e, key) => {
    setIsDragOver(false);
    onDropElement(e, key);
  };

  return (
    <div 
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnterRule}
      onDragLeave={handleDragLeaveRule}
      onDrop={(e) => handleDroppedValueAction(e, schemaKey)}
      style={{ 
        padding: '20px', 
        background: isLinked ? '#04140f' : isDragOver ? '#1c1917' : '#09090b', 
        borderRadius: '10px', 
        border: `2px dashed ${isLinked ? '#10b981' : isDragOver ? '#3b82f6' : '#27272a'}`,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Target Relational Index Key
        </span>
        <strong style={{ fontSize: '15px', color: '#f4f4f5', fontFamily: 'monospace' }}>
          {schemaKey}
        </strong>
      </div>
      
      <div style={{ marginTop: '12px' }}>
        {isLinked ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#022c22', padding: '10px 14px', borderRadius: '6px', border: '1px solid #065f46' }}>
            <span style={{ color: '#34d399', fontWeight: '600', fontSize: '13px' }}>
              Mapped Attribute: <code style={{ background: '#04140f', padding: '2px 6px', borderRadius: '4px', color: '#6ee7b7' }}>{pairedSourceField}</code>
            </span>
            <button onClick={() => onClearElement(schemaKey)} className="clear-link-btn" style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', padding: 0 }}>
              Disconnect Pipeline
            </button>
          </div>
        ) : (
          <span style={{ color: '#4b5563', fontSize: '13px', fontStyle: 'italic', display: 'block', padding: '4px 0' }}>
            {isDragOver ? "Release link vector payload now..." : "Awaiting drag node alignment input connection vector..."}
          </span>
        )}
      </div>
    </div>
  );
}
