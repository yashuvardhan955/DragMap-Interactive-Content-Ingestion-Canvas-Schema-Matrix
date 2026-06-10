DragMap – Interactive Content Ingestion Canvas and Schema Matrix

An administrative database operations dashboard panel enabling users to take unstructured, multi-source raw files (CSV, JSON metadata) and visually match properties onto relational system tables.

Business Utility and Frontend Focus:

Interactive Drag-and-Drop Canvas: Programmed an infinite-workspace layout canvas entirely from scratch using the native browser HTML5 Drag and Drop API inside React 18 and Vite 5.

State Render Optimization: Implemented strict conditional rendering algorithms and parent-child memoization patterns to recalculate dynamic drag target states without layout stutter or rendering delays.

Project Structure:

dragmap-ingestion-canvas/
dragmap-ingestion-canvas/
├── backend/

│   └── main.py

└── frontend/

    ├── src/
    │   ├── components/
    │   │   ├── CodeSchemaViewer.jsx
    │   │   └── DropTargetField.jsx
    │   └── App.jsx
    └── index.html

Core Technical Features:

 ->Client-Side Validation Checks: Uses custom TypeScript interface layers to automatically flag data type mismatches on the front end before initiating network ingestion transfers.

->Atomic Ingestion Schema Parsing: Backed by a Python 3.12 FastAPI microservice that extracts mapped properties into clean, structured dictionaries ready for Supabase relational database integration.

Local Installation and Setup:

Backend Environment:

->Navigate to the backend directory and prepare dependencies:
cd backend
pip install fastapi uvicorn pydantic

->Execute the schema validator compiler API layer:
python main.py

Frontend Workspace:

->Navigate to the frontend directory and install dependencies:
cd ../frontend
npm install

Boot the optimized browser development workspace:
npm run dev
