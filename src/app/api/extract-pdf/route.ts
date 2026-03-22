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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Bruk eval('require') for å tvinge Vercel til å laste biblioteket riktig
    // Dette er en "magisk" linje som ofte fikser worker-problemer på Vercel
    const PDFParse = eval('require')('pdf-parse');

    // 3. Kjør ekstraksjonen
    // Vi bruker standard pdf-parse som er mest stabil
    const data = await PDFParse(buffer);
    
    return NextResponse.json({ 
      text: (data.text || "").trim() 
    });

  } catch (error: any) {
    console.error('PDF Extraction Error:', error);
    return NextResponse.json({ 
      error: 'Kunne ikke lese PDF-filen på serveren.',
      details: error.message 
    }, { status: 500 });
  }
}
