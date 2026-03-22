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

    // 1. Bruk standard 'require' for PDF-parse for å slippe ESM-problemer på Vercel
    const pdf = await import('pdf-parse');
    const pdfModule = pdf as any;
    const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule.default;

    // 2. Vi fjerner manuell workerSrc helt. 
    // pdf-parse skal håndtere dette automatisk hvis vi ikke overstyrer det feil.
    
    let text = "";
    if (typeof PDFParse === 'function' && !PDFParse.prototype?.getText) {
      // Standard versjon (enklest og tryggest på Vercel)
      const data = await PDFParse(buffer);
      text = data.text;
    } else {
      // Mehmet-kozan versjon
      const parser = new PDFParse({ data: buffer, verbosity: 0 });
      const result = await parser.getText();
      text = result.text;
      if (typeof parser.destroy === 'function') await parser.destroy();
    }

    return NextResponse.json({ text: (text || "").trim() });

  } catch (error: any) {
    console.error('Extraction error:', error);
    // Hvis det feiler, prøv en siste nød-løsning: returner en feilmelding brukeren forstår
    return NextResponse.json({ 
      error: 'PDF-lesing feilet på serveren. Prøv å lime inn teksten manuelt.',
      details: error.message 
    }, { status: 500 });
  }
}
