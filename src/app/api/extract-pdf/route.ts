import { NextResponse } from 'next/server';
import PDFParse from 'pdf-parse';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Den originale pdf-parse (1.1.1) er en enkel funksjon
    // Den fungerer perfekt på Vercel uten workers eller https-feil
    const data = await PDFParse(buffer);
    
    return NextResponse.json({ 
      text: (data.text || "").trim() 
    });

  } catch (error: any) {
    console.error('PDF Error:', error);
    return NextResponse.json({ 
      error: 'Serveren kunne ikke lese PDF-en.',
      details: error.message 
    }, { status: 500 });
  }
}
