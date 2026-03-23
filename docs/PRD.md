# Product Requirements Document (PRD): JobFit-AI

## 1. Objectives
Deliver a functional prototype that takes a CV/Cover Letter and a Job Description and produces optimized, ready-to-use career documents.

## 2. Features
- **PDF Extraction**: Stable text extraction from user-uploaded PDFs (using pdfjs-dist).
- **URL Extraction**: Ability to pull job descriptions from URLs (using cheerio).
- **AI Analysis**: Multi-step analysis using OpenAI's API.
- **Document Generation**: Rewritten CV (ATS-optimized) and tailored Cover Letter (business-standard).
- **UI/UX**: Clean, responsive interface with separate panels for input and results.

## 3. Technical Constraints
- **Framework**: Next.js 16 (App Router, Turbopack).
- **Backend**: Serverless API routes and Cloudflare Workers for secure LLM proxying.
- **Environment**: Vercel deployment with server-side secret management.

## 4. User Interaction
1. User uploads CV/CL and pastes Job URL/Text.
2. User selects Target Language and Tone.
3. User clicks "Analyze."
4. Application displays split-view results: Match Score, Rewritten CV, and Cover Letter.
