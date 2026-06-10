import React from 'react';

export default function CodeSchemaViewer({ alignments }) {
  const mappingEntriesCount = Object.keys(alignments).length;
  
  return (
    <div className="schema-sidebar-card" style={{ background: '#09090b', border: '1px solid #1c1c1f', padding: '24px', borderRadius: '12px', height: 'fit-content', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>Compiled Configuration Blueprint</h3>
        <span style={{ fontSize: '11px', background: '#1e1b4b', color: '#818cf8', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold' }}>
          LINKS_COUNT: {mappingEntriesCount}
        </span>
      </div>
      
      <p style={{ color: '#71717a', fontSize: '13px', margin: '0 0 20px 0', lineHeight: '1.4' }}>
        Real-time metadata structural blueprint dictionary array matching client schema nodes inside active memory cycles:
      </p>

      <div style={{ position: 'relative' }}>
        <pre className="code-block-render" style={{ margin: 0, padding: '16px', background: '#030205', borderRadius: '8px', overflowX: 'auto', color: '#22d3ee', fontFamily: 'monospace', fontSize: '13px', border: '1px solid #27272a' }}>
          <code>{JSON.stringify(alignments, null, 2)}</code>
        </pre>
      </div>

      <div style={{ marginTop: '20px', borderTop: '1px solid #1c1c1f', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#4b5563' }}>
          <span style={{ width: '6px', height: '6px', background: mappingEntriesCount > 0 ? '#10b981' : '#f59e0b', borderRadius: '50%' }}></span>
          <span>{mappingEntriesCount > 0 ? "Matrix payload structured for runtime sync validations" : "Structural map empty: awaiting connector paths"}</span>
        </div>
      </div>
    </div>
  );
}
