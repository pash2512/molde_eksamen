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
    if (!file) return NextResponse.json({ error: 'Ingen fil funnet' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Bruk en mer direkte import for å unngå Turbopack-problemer
    const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
    
    // VIKTIG: Vi tvinger PDF.js til å kjøre uten "worker"-filer
    // Dette er den sikreste måten på Vercel
    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
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

    return NextResponse.json({ text: fullText.trim() || "Ingen tekst funnet i PDF-en." });

  } catch (error: any) {
    console.error('PDF.js Error:', error);
    return NextResponse.json({ 
      error: 'Feil ved lesing av PDF-filen.',
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
}
