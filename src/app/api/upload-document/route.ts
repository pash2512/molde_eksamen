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
    const documentType = formData.get('documentType') || 'unknown';
    
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Bruk det nye PDF.js biblioteket
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
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
      documentType: documentType
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Serverfeil ved lesing av dokument.' }, { status: 500 });
  }
}
