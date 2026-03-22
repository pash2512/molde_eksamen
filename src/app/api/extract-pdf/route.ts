import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 1. Definer DOMMatrix globalt for å unngå krasj i PDF-biblioteket
  if (typeof (globalThis as any).DOMMatrix === 'undefined') {
    (globalThis as any).DOMMatrix = class {
      static fromFloat64Array() { return new (globalThis as any).DOMMatrix(); }
      static fromFloat32Array() { return new (globalThis as any).DOMMatrix(); }
    };
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Ingen fil lastet opp' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Importer biblioteket dynamisk
    const pdf = await import('pdf-parse');
    const pdfModule = pdf as any;
    const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule.default;

    // 3. Kjør ekstraksjonen uten manuell worker-konfigurasjon
    // Vi pakker det inn i et løfte for å håndtere asynkronitet bedre på Vercel
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
    console.error('PDF Extraction Error:', error);
    // Hvis "fake worker" feilen oppstår, gir vi en forklarende melding
    const isWorkerError = error.message?.includes('worker');
    return NextResponse.json({ 
      error: isWorkerError ? 'Serveren har problemer med PDF-formatet. Prøv å lagre PDF-en på nytt eller lim inn tekst.' : 'Feil ved lesing av PDF.',
      details: error.message 
    }, { status: 500 });
  }
}
