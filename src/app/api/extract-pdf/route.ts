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

    // Vi bruker PDF.js i "legacy"-modus uten workers. 
    // Dette er den mest stabile måten å hente tekst på Vercel.
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      disableWorker: true, // Kritisk: Ingen bakgrunnsprosesser
      verbosity: 0
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    // Gå gjennom hver side og trekk ut teksten
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return NextResponse.json({ 
      text: fullText.trim() || "Kunne ikke trekke ut tekst fra denne PDF-en.",
      pageCount: pdf.numPages
    });

  } catch (error: any) {
    console.error('Extraction Error:', error);
    return NextResponse.json({ 
      error: 'Kunne ikke lese teksten i PDF-en.', 
      details: error.message 
    }, { status: 500 });
  }
}
