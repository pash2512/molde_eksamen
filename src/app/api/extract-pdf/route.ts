import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (typeof (globalThis as any).DOMMatrix === 'undefined') {
    (globalThis as any).DOMMatrix = class {
      static fromFloat64Array() { return new (globalThis as any).DOMMatrix(); }
      static fromFloat32Array() { return new (globalThis as any).DOMMatrix(); }
    };
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Importer bibliotekene
    const pdf = await import('pdf-parse');
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    // 2. Tving biblioteket til å bruke en ekstern "worker" fra nettet
    // Dette stopper "Cannot find module pdf.worker.mjs" feilen på Vercel
    const pdfjsVersion = "5.4.296"; 
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/legacy/build/pdf.worker.min.mjs`;

    const pdfModule = pdf as any;
    const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule.default;

    let text = "";
    if (typeof PDFParse === 'function' && !PDFParse.prototype?.getText) {
      const data = await PDFParse(buffer);
      text = data.text;
    } else {
      const parser = new PDFParse({ data: buffer, verbosity: 0 });
      const result = await parser.getText();
      text = result.text;
      if (typeof parser.destroy === 'function') await parser.destroy();
    }

    return NextResponse.json({ text: (text || "").trim() });

  } catch (error: any) {
    console.error('Extraction error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
