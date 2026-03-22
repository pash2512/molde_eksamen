import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Polyfill DOMMatrix for PDF.js
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

    // Last PDF.js dynamisk
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    // Konfigurer for Node.js miljø
    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
      verbosity: 0
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    // Gå gjennom hver side og hent tekst
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
    console.error('PDF JS Error:', error);
    return NextResponse.json({ 
      error: 'Kunne ikke lese PDF-innholdet.',
      details: error.message 
    }, { status: 500 });
  }
}
