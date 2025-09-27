// Import pdf-parse directly
import pdfParse from 'pdf-parse';

export interface PDFProcessingResult {
  text: string;
  numPages: number;
  success: boolean;
  error?: string;
}

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFProcessingResult> {
  try {
    const data = await pdfParse(buffer);
    
    // Clean the extracted text
    let cleanedText = data.text
      .replace(/\n+/g, ' ') // Replace multiple newlines with single space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    // Handle common PDF extraction issues
    cleanedText = cleanedText
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      .replace(/(\d)([A-Z])/g, '$1 $2') // Add space between numbers and letters
      .replace(/([.!?])([A-Z])/g, '$1 $2'); // Add space after punctuation
    
    return {
      text: cleanedText,
      numPages: data.numpages,
      success: true
    };
  } catch (error) {
    console.error('PDF processing error:', error);
    return {
      text: '',
      numPages: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Validate PDF file
 */
export function validatePDFFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'File must be a PDF' };
  }
  
  // Check file size (limit to 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  return { valid: true };
}

/**
 * Convert File to Buffer (for server-side processing)
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
