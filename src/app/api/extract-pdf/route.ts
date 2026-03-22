import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Vi bruker dynamic require inne i funksjonen for å unngå at Vercel 
    // prøver å sjekke test-filene til biblioteket under bygging.
    const PDFParse = require('pdf-parse');
    const data = await PDFParse(buffer);
    
    return NextResponse.json({ 
      text: (data.text || "").trim() 
    });

  } catch (error: any) {
    console.error('PDF Error:', error);
    return NextResponse.json({ 
      error: 'Kunne ikke lese PDF.',
      details: error.message 
    }, { status: 500 });
  }
}
