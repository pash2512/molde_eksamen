# Architecture: JobFit-AI

## 1. System Overview
JobFit-AI uses a **Backend-for-Frontend (BFF)** pattern to securely handle sensitive operations and integrate with third-party LLM services.

## 2. Component Diagram
- **Frontend (Next.js)**: React components for file upload, URL input, and multi-pane results.
- **Next.js API Routes**:
  - `api/extract-pdf`: Server-side extraction of text from PDF using pdfjs-dist.
  - `api/extract-url`: Scrapes job descriptions from provided URLs using cheerio.
  - `api/analyze`: Coordinates the final prompt engineering and LLM interaction.
- **Secure Backend (Cloudflare Workers)**: A secure proxy for OpenAI API keys, adding rate limiting and input validation.
- **External Services**: OpenAI GPT-4o for document reconstruction and ATS optimization.

## 3. Data Flow
1. User provides raw documents and job context.
2. Next.js server processes documents (extracts text).
3. Processed text is sent to the LLM via the secure proxy.
4. LLM response is returned to the frontend as a JSON object containing rewritten documents.
5. Frontend renders the JSON as formatted documents.
