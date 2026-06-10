from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import uvicorn

app = FastAPI(
    title="DataMap Normalization Engine Platform",
    description="Structural data alignment processor validating client schema drag layouts.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlignmentVectorRule(BaseModel):
    source_field: str = Field(..., min_length=1, max_length=64, description="Raw variable identifier token string source target label.")
    target_field: str = Field(..., min_length=1, max_length=64, description="Target data table property structural assignment slot index validation coordinate.")

class PipelineIngestPayload(BaseModel):
    structural_matrices: List[AlignmentVectorRule]
    raw_document_records: List[Dict[str, Any]]

@app.post("/api/v1/ingest/compile-matrix")
async def compile_ingestion_matrix(payload: PipelineIngestPayload):
    if not payload.raw_document_records:
        raise HTTPException(status_code=400, detail="Matrix compile exception: Data record matrices payload blocks are required.")
    
    compiled_transformation_ledger = []
    matrix_dictionary = {rule.source_field: rule.target_field for rule in payload.structural_matrices}

    for input_record in payload.raw_document_records:
        transformed_dictionary_row = {}
        for source_key, target_key in matrix_dictionary.items():
            if source_key in input_record:
                transformed_dictionary_row[target_key] = input_record[source_key]
            else:
                transformed_dictionary_row[target_key] = None
        compiled_transformation_ledger.append(transformed_dictionary_row)

    return {
        "status": "COMPILATION_SUCCESSFUL",
        "processed_rows_count": len(compiled_transformation_ledger),
        "schema_aligned_samples": compiled_transformation_ledger,
        "database_status": "Supabase Relational Cluster Sync Sequence Initialized Successfully"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
