// Moroccan Legal Knowledge Base for RAG
// Based on Moroccan Code of Obligations and Contracts (Dahir des Obligations et Contrats)

export interface LegalChunk {
  id: string;
  text: string;
  language: 'ar' | 'fr' | 'en';
  category: string;
  notes: string;
  keywords: string[];
}

export const moroccanLegalKnowledgeBase: LegalChunk[] = [
  // Payment and Financial Obligations
  {
    id: 'payment_001',
    text: 'L\'obligation de payer le prix est de l\'essence du contrat de vente. Le prix doit être déterminé et sérieux. À défaut de stipulation contraire, le paiement est exigible au lieu et au moment de la livraison.',
    language: 'fr',
    category: 'Payment',
    notes: 'Article 489 du DOC - Le paiement doit être effectué selon les modalités convenues',
    keywords: ['paiement', 'prix', 'vente', 'livraison', 'exigible']
  },
  {
    id: 'payment_002',
    text: 'في عقد البيع، يجب أن يكون الثمن محدداً وجدياً. وفي حالة عدم وجود اتفاق مخالف، يستحق الدفع في مكان وزمان التسليم.',
    language: 'ar',
    category: 'Payment',
    notes: 'المادة 489 من قانون الالتزامات والعقود - يجب الدفع حسب الشروط المتفق عليها',
    keywords: ['دفع', 'ثمن', 'بيع', 'تسليم', 'استحقاق']
  },
  {
    id: 'payment_003',
    text: 'Payment terms must be clearly specified in contracts. Late payment may incur interest charges as per Moroccan commercial law. Default in payment can lead to contract termination.',
    language: 'en',
    category: 'Payment',
    notes: 'Based on DOC Article 489 - Payment obligations in commercial contracts',
    keywords: ['payment', 'terms', 'interest', 'default', 'termination']
  },

  // Contract Termination
  {
    id: 'termination_001',
    text: 'La résolution du contrat peut avoir lieu de plein droit, lorsqu\'elle a été expressément stipulée pour le cas où l\'une des parties ne satisferait pas à ses engagements.',
    language: 'fr',
    category: 'Termination',
    notes: 'Article 259 du DOC - Conditions de résolution automatique du contrat',
    keywords: ['résolution', 'contrat', 'engagements', 'stipulation', 'automatique']
  },
  {
    id: 'termination_002',
    text: 'يمكن فسخ العقد تلقائياً عندما ينص صراحة على ذلك في حالة عدم وفاء أحد الأطراف بالتزاماته.',
    language: 'ar',
    category: 'Termination',
    notes: 'المادة 259 من قانون الالتزامات والعقود - شروط الفسخ التلقائي للعقد',
    keywords: ['فسخ', 'عقد', 'التزامات', 'تلقائي', 'وفاء']
  },

  // Liability and Damages
  {
    id: 'liability_001',
    text: 'Toute personne est responsable du dommage moral ou matériel qu\'elle a causé, non seulement par son fait, mais encore par sa faute, lorsque cette faute est établie.',
    language: 'fr',
    category: 'Liability',
    notes: 'Article 77 du DOC - Responsabilité civile et dommages-intérêts',
    keywords: ['responsabilité', 'dommage', 'faute', 'matériel', 'moral']
  },
  {
    id: 'liability_002',
    text: 'كل شخص مسؤول عن الضرر المعنوي أو المادي الذي تسبب فيه، ليس فقط بفعله ولكن أيضاً بخطئه، عندما يثبت هذا الخطأ.',
    language: 'ar',
    category: 'Liability',
    notes: 'المادة 77 من قانون الالتزامات والعقود - المسؤولية المدنية والتعويضات',
    keywords: ['مسؤولية', 'ضرر', 'خطأ', 'مادي', 'معنوي']
  },

  // Confidentiality and Trade Secrets
  {
    id: 'confidentiality_001',
    text: 'Les parties s\'engagent à maintenir strictement confidentielles toutes les informations échangées dans le cadre du contrat. Cette obligation survit à la fin du contrat.',
    language: 'fr',
    category: 'Confidentiality',
    notes: 'Obligation de confidentialité selon les principes généraux du DOC',
    keywords: ['confidentialité', 'informations', 'secret', 'obligation', 'survie']
  },
  {
    id: 'confidentiality_002',
    text: 'يلتزم الأطراف بالحفاظ على سرية جميع المعلومات المتبادلة في إطار العقد. هذا الالتزام يستمر حتى بعد انتهاء العقد.',
    language: 'ar',
    category: 'Confidentiality',
    notes: 'التزام السرية حسب المبادئ العامة لقانون الالتزامات والعقود',
    keywords: ['سرية', 'معلومات', 'التزام', 'استمرار', 'انتهاء']
  },

  // Force Majeure
  {
    id: 'force_majeure_001',
    text: 'L\'obligation s\'éteint lorsque la chose certaine et déterminée qui en est l\'objet périt par cas fortuit ou force majeure.',
    language: 'fr',
    category: 'Force Majeure',
    notes: 'Article 269 du DOC - Extinction des obligations par force majeure',
    keywords: ['obligation', 'extinction', 'cas fortuit', 'force majeure', 'périt']
  },
  {
    id: 'force_majeure_002',
    text: 'ينقضي الالتزام عندما يهلك الشيء المعين والمحدد الذي هو محل الالتزام بسبب القوة القاهرة أو الحادث الطارئ.',
    language: 'ar',
    category: 'Force Majeure',
    notes: 'المادة 269 من قانون الالتزامات والعقود - انقضاء الالتزامات بالقوة القاهرة',
    keywords: ['انقضاء', 'التزام', 'قوة قاهرة', 'حادث طارئ', 'هلاك']
  },

  // Contract Formation and Validity
  {
    id: 'formation_001',
    text: 'Les éléments nécessaires pour la validité des obligations qui dérivent d\'une déclaration de volonté sont: 1° La capacité de s\'obliger; 2° Une déclaration de volonté valable; 3° Un objet certain; 4° Une cause licite.',
    language: 'fr',
    category: 'Formation',
    notes: 'Article 2 du DOC - Éléments essentiels de validité des contrats',
    keywords: ['validité', 'capacité', 'volonté', 'objet', 'cause licite']
  },
  {
    id: 'formation_002',
    text: 'العناصر اللازمة لصحة الالتزامات المستمدة من إعلان الإرادة هي: 1° الأهلية للالتزام؛ 2° إعلان إرادة صحيح؛ 3° محل معين؛ 4° سبب مشروع.',
    language: 'ar',
    category: 'Formation',
    notes: 'المادة 2 من قانون الالتزامات والعقود - العناصر الأساسية لصحة العقود',
    keywords: ['صحة', 'أهلية', 'إرادة', 'محل', 'سبب مشروع']
  },

  // Penalties and Interest
  {
    id: 'penalties_001',
    text: 'Les parties peuvent convenir que celui qui manquera d\'exécuter l\'obligation paiera une certaine somme à titre de dommages-intérêts forfaitaires.',
    language: 'fr',
    category: 'Penalties',
    notes: 'Article 264 du DOC - Clause pénale et dommages-intérêts forfaitaires',
    keywords: ['clause pénale', 'dommages-intérêts', 'forfaitaires', 'exécution', 'manquement']
  },

  // Commercial Practices
  {
    id: 'commercial_001',
    text: 'Dans les contrats commerciaux, les délais de paiement ne peuvent excéder 90 jours à compter de la date de livraison ou de prestation de service, sauf accord contraire.',
    language: 'fr',
    category: 'Commercial',
    notes: 'Pratiques commerciales au Maroc - Délais de paiement',
    keywords: ['commercial', 'délais', 'paiement', '90 jours', 'livraison']
  }
];

// Simple similarity search function for RAG
export function searchRelevantChunks(query: string, limit: number = 3): LegalChunk[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  // Score each chunk based on keyword matches and text similarity
  const scoredChunks = moroccanLegalKnowledgeBase.map(chunk => {
    let score = 0;
    
    // Check keyword matches
    chunk.keywords.forEach(keyword => {
      if (queryWords.some(word => keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase()))) {
        score += 3;
      }
    });
    
    // Check text content matches
    const chunkText = chunk.text.toLowerCase();
    queryWords.forEach(word => {
      if (chunkText.includes(word)) {
        score += 1;
      }
    });
    
    // Boost score for category relevance
    const categoryWords = ['payment', 'paiement', 'دفع', 'termination', 'résolution', 'فسخ', 
                          'liability', 'responsabilité', 'مسؤولية', 'confidentiality', 'confidentialité', 'سرية'];
    categoryWords.forEach(catWord => {
      if (queryLower.includes(catWord.toLowerCase())) {
        if (chunk.category.toLowerCase().includes(catWord.toLowerCase()) || 
            chunk.text.toLowerCase().includes(catWord.toLowerCase())) {
          score += 2;
        }
      }
    });
    
    return { ...chunk, score };
  });
  
  // Sort by score and return top results
  return scoredChunks
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Detect input language
export function detectLanguage(text: string): 'ar' | 'fr' | 'en' | 'darija' {
  const arabicPattern = /[\u0600-\u06FF]/;
  const frenchWords = ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'ou', 'dans', 'pour', 'avec', 'sur', 'par'];
  const englishWords = ['the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const darijaWords = ['ديال', 'غادي', 'كيف', 'واش', 'بلا', 'حتى', 'هاد', 'دابا'];
  
  if (arabicPattern.test(text)) {
    // Check if it's Darija (Moroccan Arabic) vs Standard Arabic
    const textLower = text.toLowerCase();
    const darijaCount = darijaWords.filter(word => textLower.includes(word)).length;
    return darijaCount > 0 ? 'darija' : 'ar';
  }
  
  const textWords = text.toLowerCase().split(/\s+/);
  const frenchCount = frenchWords.filter(word => textWords.includes(word)).length;
  const englishCount = englishWords.filter(word => textWords.includes(word)).length;
  
  if (frenchCount > englishCount) return 'fr';
  if (englishCount > frenchCount) return 'en';
  
  return 'en'; // Default to English
}
