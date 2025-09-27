# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 18+
- OpenAI API key

## Installation Steps

1. **Navigate to project directory**
   ```bash
   cd moroccan-contract-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Go to [http://localhost:3000](http://localhost:3000)

## Testing the Application

### Text Analysis
1. Select output language (Arabic, French, English, or Darija)
2. Paste contract text in the textarea
3. Click "Analyze Contract"
4. Review the results with severity, category, rewrite, and notes

### PDF Analysis
1. Select output language
2. Upload a PDF file (drag & drop or click to browse)
3. Wait for text extraction
4. Click "Analyze Contract"
5. Review the analysis results

## Sample Contract Clauses to Test

### English
```
The buyer shall pay the full amount within 30 days of delivery. Failure to pay will result in immediate termination of the contract.
```

### French
```
L'acheteur doit payer le montant total dans les 30 jours suivant la livraison. Le défaut de paiement entraînera la résiliation immédiate du contrat.
```

### Arabic
```
يجب على المشتري دفع المبلغ الكامل خلال 30 يوماً من التسليم. عدم الدفع سيؤدي إلى إنهاء العقد فوراً.
```

## Production Deployment

### Build
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Deploy to Vercel
```bash
npx vercel --prod
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Check TypeScript types: `npm run type-check`
- Verify environment variables are set

### API Issues
- Verify OpenAI API key is correct
- Check API key has sufficient credits
- Ensure network connectivity

### PDF Issues
- File size must be under 10MB
- Only PDF files are supported
- Ensure file is not corrupted

## Features Overview

✅ **Multi-language Support**: AR/FR/EN/Darija input and output
✅ **PDF Processing**: Extract and analyze PDF contracts
✅ **RAG Integration**: Moroccan legal knowledge base
✅ **AI Analysis**: OpenAI GPT-4o-mini powered
✅ **Responsive Design**: Mobile-friendly interface
✅ **Copy Functionality**: Easy result sharing
✅ **Real-time Processing**: Instant analysis results

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all setup steps are completed
3. Ensure environment variables are properly set
4. Test with sample contract clauses provided above
