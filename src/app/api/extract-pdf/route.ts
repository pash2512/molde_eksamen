import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 1. Polyfill for DOMMatrix
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

    // 2. BRUK LEGACY-VERSJONEN - Dette er kritisk for Vercel!
    // Dette tvinger PDF.js til å bruke den innebygde Node.js-motoren
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      // Disse innstillingene stopper worker-feilen
      disableWorker: true,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return NextResponse.json({ text: fullText.trim() });

  } catch (error: any) {
    console.error('PDF.js Legacy Error:', error);
    return NextResponse.json({ 
      error: 'Serveren klarte ikke å lese PDF-en.',
      details: error.message 
    }, { status: 500 });
  }
}
