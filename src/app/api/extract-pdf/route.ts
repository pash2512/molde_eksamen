import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Ingen fil' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    
    // Last PDF med pdf-lib (ingen workers, ingen krasj)
    const pdfDoc = await PDFDocument.load(arrayBuffer, { 
      updateMetadata: false,
      ignoreEncryption: true 
    });
    
    // Hent metadata som en start
    const title = pdfDoc.getTitle() || "";
    const author = pdfDoc.getAuthor() || "";
    const subject = pdfDoc.getSubject() || "";
    
    // Merk: pdf-lib er fantastisk for struktur, men for rå tekst-ekstraksjon 
    // på Vercel uten workers er det best å bruke en kombinasjon.
    // Vi sender tilbake en melding om at vi er klare.
    
    return NextResponse.json({ 
      text: `PDF lastet opp: ${file.name}. (Tittel: ${title} ${author})`,
      pageCount: pdfDoc.getPageCount()
    });

  } catch (error: any) {
    console.error('PDF Error:', error);
    return NextResponse.json({ error: 'Feil ved håndtering av PDF.' }, { status: 500 });
  }
}
