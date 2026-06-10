import React from 'react';

export default function DropTargetField({ schemaKey, pairedSourceField, onDropElement, onClearElement }) {
  const isLinked = !!pairedSourceField;

  return (
    <div 
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropElement(e, schemaKey)}
      style={{ 
        padding: '20px', 
        background: '#09090b', 
        borderRadius: '10px', 
        border: `2px dashed ${isLinked ? '#10b981' : '#27272a'}`,
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      <div style={{ fontSize: '13px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
        Target Database Index Key: <strong style={{ color: '#f4f4f5' }}>{schemaKey}</strong>
      </div>
      
      {isLinked ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: '#34d399', fontWeight: '600', fontSize: '14px' }}>
            Linked to ➔ <code style={{ background: '#064e3b', padding: '2px 6px', borderRadius: '4px' }}>{pairedSourceField}</code>
          </span>
          <button 
            onClick={() => onClearElement(schemaKey)}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
          >
            Disconnect Field
          </button>
        </div>
      ) : (
        <span style={{ color: '#3f3f46', fontSize: '13px', fontStyle: 'italic' }}>
          Drop source input property vector link here...
        </span>
      )}
    </div>
  );
}
