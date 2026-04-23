export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, lang = 'pt-BR') {
  if (!isSpeechSupported()) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find the best Portuguese voice
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find(v =>
    (v.lang === 'pt-BR' || v.lang === 'pt_BR') &&
    v.name.toLowerCase().includes('google')
  ) || voices.find(v =>
    v.lang === 'pt-BR' || v.lang === 'pt_BR'
  ) || voices.find(v =>
    v.lang.startsWith('pt')
  );

  if (ptVoice) utterance.voice = ptVoice;

  window.speechSynthesis.speak(utterance);
}

// Voices may not be loaded immediately, this helps
export function getVoicesReady(callback) {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    callback(voices);
    return;
  }
  window.speechSynthesis.onvoiceschanged = () => {
    callback(window.speechSynthesis.getVoices());
  };
}
