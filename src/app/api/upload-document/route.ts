import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const PDFParse = require('pdf-parse');
    const data = await PDFParse(buffer);
    
    return NextResponse.json({ 
      text: (data.text || "").trim(),
      documentType: formData.get('documentType') || 'unknown'
    });

  } catch (error: any) {
    console.error('PDF Error:', error);
    return NextResponse.json({ error: 'Server feil ved lesing av dokument.' }, { status: 500 });
  }
}
