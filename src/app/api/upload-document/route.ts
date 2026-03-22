import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 1. Definer DOMMatrix med en gang inne i funksjonen
  if (typeof (globalThis as any).DOMMatrix === 'undefined') {
    (globalThis as any).DOMMatrix = class {
      static fromFloat64Array() { return new (globalThis as any).DOMMatrix(); }
      static fromFloat32Array() { return new (globalThis as any).DOMMatrix(); }
    };
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('documentType') as string;

    if (!file) return NextResponse.json({ error: 'File is required' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Forenklet import som TypeScript godtar
    const pdf = await import('pdf-parse');
    const pdfModule = pdf as any;
    const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule.default;

    if (!PDFParse) {
      throw new Error('Could not find PDFParse in the imported module.');
    }

    try {
        let text = "";
        if (typeof PDFParse === 'function' && !PDFParse.prototype?.getText) {
            const data = await PDFParse(buffer);
            text = data.text || "";
        } else {
            const parser = new PDFParse({ data: buffer, verbosity: 0 });
            const result = await parser.getText();
            text = result.text || "";
            if (typeof parser.destroy === 'function') await parser.destroy();
        }

        return NextResponse.json({ 
            documentType: documentType || 'unknown',
            text: text.trim() 
        });

    } catch (parseError: any) {
        console.error('Extraction failed:', parseError);
        return NextResponse.json({ error: parseError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Global Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
