export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        🇲🇦 Moroccan Contract Checker
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Analyze your contracts against Moroccan law (Code des Obligations et des Contrats). 
        Get instant feedback on compliance, risks, and suggested improvements.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
        <span className="bg-white px-3 py-1 rounded-full shadow-sm">🇦🇷 Arabic</span>
        <span className="bg-white px-3 py-1 rounded-full shadow-sm">🇫🇷 French</span>
        <span className="bg-white px-3 py-1 rounded-full shadow-sm">🇬🇧 English</span>
        <span className="bg-white px-3 py-1 rounded-full shadow-sm">🇲🇦 Darija</span>
      </div>
    </div>
  );
}
