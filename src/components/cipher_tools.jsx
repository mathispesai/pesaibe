import { useCallback } from 'react';
import { CipherMethodSelector } from './cipher/cipher_method_selector.jsx';
import { CipherParameterPanel } from './cipher/cipher_parameter_panel.jsx';
import { CipherInputOutput } from './cipher/cipher_input_output.jsx';
import { CipherResults } from './cipher/cipher_results.jsx';
import { CipherSearchBar } from './cipher/cipher_search_bar.jsx';
import CipherExplanation from './cipher_explanation.jsx';

import { useCipherState } from '../hooks/use_cipher_state.js';
import { useCipherHistory } from '../hooks/use_cipher_history.js';
import { useSearchState } from '../hooks/use_search_state.js';
import { useQRGeneration } from '../hooks/use_qr_generation.js';
import { usePDFGeneration } from '../hooks/use_pdf_generation.js';
import { useFavorites } from '../hooks/use_favorites.js';
import { useKeyboardShortcuts } from '../utils/keyboard-shortcuts.js';
import { createPDFDownloadHandler } from '../utils/pdf-utils.js';

export default function CipherTools() {
  // State management
  const cipherState = useCipherState();
  const searchState = useSearchState();
  const { favorites, toggleFavorite } = useFavorites([]);

  // History management
  const { handleUndo, handleRedo, canUndo, canRedo } = useCipherHistory(
    cipherState.input, cipherState.selectedMethod
  );

  // QR and PDF generation
  const { qrImages } = useQRGeneration(cipherState.chunkParts);
  const { downloadPDF } = usePDFGeneration();

  // Event handlers
  const restoreFromHistory = useCallback((entry) => {
    if (entry) {
      cipherState.setInput(entry.input);
      cipherState.setSelectedMethod(entry.method);
      // Don't restore parameters - let user keep their current parameter settings
    }
  }, [cipherState]);

  const handleUndoWithRestore = useCallback(() => {
    const entry = handleUndo();
    restoreFromHistory(entry);
  }, [handleUndo, restoreFromHistory]);

  const handleRedoWithRestore = useCallback(() => {
    const entry = handleRedo();
    restoreFromHistory(entry);
  }, [handleRedo, restoreFromHistory]);

  const handleDownloadPDF = useCallback(() => {
    const pdfHandler = createPDFDownloadHandler(downloadPDF);
    const handler = pdfHandler(cipherState, cipherState.chunkParts, qrImages);
    handler();
  }, [downloadPDF, cipherState, qrImages]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+z': handleUndoWithRestore,
    'ctrl+y': handleRedoWithRestore
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <CipherSearchBar
        searchTerm={searchState.searchTerm}
        onSearchChange={searchState.setSearchTerm}
        showFavoritesOnly={searchState.showFavoritesOnly}
        onToggleFavorites={searchState.setShowFavoritesOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndoWithRestore}
        onRedo={handleRedoWithRestore}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CipherMethodSelector
            selectedMethod={cipherState.selectedMethod}
            onMethodSelect={cipherState.setSelectedMethod}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            searchTerm={searchState.searchTerm}
            showFavoritesOnly={searchState.showFavoritesOnly}
          />
          {cipherState.hasContent && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <CipherExplanation
                method={cipherState.selectedMethod}
                input={cipherState.input}
                year={cipherState.parameters.year}
                skip={cipherState.parameters.skip}
                shift={cipherState.parameters.shift}
                wordList={cipherState.wordList}
                codeword={cipherState.parameters.codeword}
                kijkwoord={cipherState.parameters.kijkwoord}
                kleurwoord={cipherState.parameters.kleurwoord}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <CipherParameterPanel
            method={cipherState.selectedMethod}
            parameters={cipherState.parameters}
            onParameterChange={cipherState.updateParameter}
          />

          <CipherInputOutput
            input={cipherState.input}
            onInputChange={cipherState.setInput}
            output={cipherState.output}
            outputFont={cipherState.outputFont}
            method={cipherState.selectedMethod}
          />

          <CipherResults
            output={cipherState.output}
            method={cipherState.selectedMethod}
            chunkParts={cipherState.chunkParts}
            qrImages={qrImages}
            onDownloadPDF={handleDownloadPDF}
          />
        </div>
      </div>
    </div>
  );
}