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
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    // Explicitly import the worker and set it to GlobalWorkerOptions
    // This is required to solve the 'Cannot find module ... pdf.worker.mjs' error on Vercel
    const pdfWorker = await import('pdfjs-dist/legacy/build/pdf.worker.mjs');
    (pdfjs as any).GlobalWorkerOptions.workerSrc = pdfWorker;

    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      disableWorker: true,
      verbosity: 0
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    return NextResponse.json({ 
      text: fullText.trim(),
      documentType: formData.get('documentType') || 'unknown'
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Dokument-lesing feilet.', 
      details: error.message 
    }, { status: 500 });
  }
}
