import React, { useState, useCallback } from 'react';
import DropTargetField from './components/DropTargetField';
import CodeSchemaViewer from './components/CodeSchemaViewer';

const INBOUND_CSV_MOCK_HEADERS = ["student_id", "first_name", "enrolled_course_title", "session_date_epoch"];
const TARGET_SCHEMA_KEYS = ["id", "name", "course", "created_at"];

export default function App() {
  const [matrixLinks, setMatrixLinks] = useState({});
  const [pipelineOutput, setPipelineOutput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const resolveDrop = useCallback((e, targetKey) => {
    e.preventDefault();
    const draggedHeader = e.dataTransfer.getData("text/plain");
    if (!draggedHeader) return;

    setMatrixLinks(prev => {
      // Remove any duplicate previous mappings for clean isolation constraints
      const filteredCopy = { ...prev };
      Object.keys(filteredCopy).forEach(k => {
        if (filteredCopy[k] === targetKey) delete filteredCopy[k];
      });
      return { ...filteredCopy, [draggedHeader]: targetKey };
    });
  }, []);

  const clearLink = useCallback((tgtKey) => {
    setMatrixLinks(prev => {
      const copy = { ...prev };
      const srcKey = Object.keys(copy).find(k => copy[k] === tgtKey);
      if (srcKey) delete copy[srcKey];
      return copy;
    });
  }, []);

  const submitIngestionMatrixPipeline = async () => {
    setIsProcessing(true);
    const rulesPayloadArray = Object.entries(matrixLinks).map(([src, tgt]) => ({
      source_field: src,
      target_field: tgt
    }));

    const structuralMockRecords = [
      { student_id: "ST-882", first_name: "Yashu Vardhan", enrolled_course_title: "Full-Stack System Design Frameworks", session_date_epoch: "177492100" }
    ];

    try {
      const response = await fetch('http://localhost:8002/api/v1/ingest/compile-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structural_matrices: rulesPayloadArray, raw_document_records: structuralMockRecords })
      });
      const data = await response.json();
      setPipelineOutput(data);
    } catch (err) {
      console.error("Pipeline network buffer exception encountered:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="canvas-wrapper" style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
        <div className="canvas-grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          <div className="source-column-shelf" style={{ background: '#09090b', border: '1px solid #1c1c1f', padding: '24px', borderRadius: '12px' }}>
            <h2>Source File Header Vectors</h2>
            {INBOUND_CSV_MOCK_HEADERS.map(header => {
              const mapped = !!matrixLinks[header];
              return (
                <div key={header} draggable={!mapped} onDragStart={(e) => e.dataTransfer.setData("text/plain", header)} style={{ opacity: mapped ? 0.4 : 1, padding: '14px', background: '#141416', border: '1px solid #27272a', borderRadius: '8px', cursor: mapped ? 'not-allowed' : 'grab', color: '#22d3ee', fontWeight: '600', marginBottom: '12px' }}>
                  ⣿  {header} {mapped && "✓"}
                </div>
              );
            })}
          </div>
          <div className="target-matrix-shelf" style={{ background: '#09090b', border: '1px solid #1c1c1f', padding: '24px', borderRadius: '12px' }}>
            <h2>Target Database Alignment Matrix</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {TARGET_SCHEMA_KEYS.map(key => (
                <DropTargetField key={key} schemaKey={key} pairedSourceField={Object.keys(matrixLinks).find(k => matrixLinks[k] === key)} onDropElement={resolveDrop} onClearElement={clearLink} />
              ))}
            </div>
          </div>
        </div>
        <CodeSchemaViewer alignments={matrixLinks} />
      </div>
      <div style={{ marginTop: '32px', maxWidth: '920px' }}>
        <button onClick={submitIngestionMatrixPipeline} disabled={Object.keys(matrixLinks).length === 0 || isProcessing} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '16px 32px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', opacity: Object.keys(matrixLinks).length === 0 ? 0.5 : 1 }}>
          {isProcessing ? "Processing Data Mapping Transformations..." : "Compile Alignment Matrix & Deploy Normalization Pipeline"}
        </button>
        {pipelineOutput && (
          <div style={{ background: '#09090b', padding: '24px', borderRadius: '12px', border: '1px solid #27272a', marginTop: '24px', fontFamily: 'monospace', fontSize: '13px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#10b981' }}>Pipeline Transaction Response Structure</h4>
            <pre style={{ margin: 0, color: '#a1a1aa', overflowX: 'auto' }}>{JSON.stringify(pipelineOutput, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
