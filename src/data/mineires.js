export const SLANG = [
  { id: 's1', word: 'uai', meaning: 'expression of surprise/confusion (like "huh?" or "wow")', example: 'Uai, ce num sabia disso nao?', register: 'Core Mineiro' },
  { id: 's2', word: 'trem', meaning: 'thing / stuff (universal noun)', example: 'Esse trem aqui nao funciona direito.', register: 'Core Mineiro' },
  { id: 's3', word: 'bao / baozao', meaning: 'great / awesome / very good', example: 'Aquele restaurante la e baozao demais!', register: 'Core Mineiro' },
  { id: 's4', word: 'so', meaning: 'man / dude (used at end of sentences)', example: 'Que saudade, so! Faz tempo que nao te vejo.', register: 'Core Mineiro' },
  { id: 's5', word: 'ne', meaning: 'right? / isn\'t it? (tag question)', example: 'Ta bom assim, ne?', register: 'Core Mineiro' },
  { id: 's6', word: 'ce', meaning: 'you (reduced from voce)', example: 'Ce vai la hoje a noite?', register: 'Cutoff' },
  { id: 's7', word: 'to / ta / tao', meaning: 'I am / you are / they are (from estou/esta/estao)', example: 'To indo agora, ta?', register: 'Cutoff' },
  { id: 's8', word: 'pra / pro', meaning: 'to / for (from para)', example: 'Vamo pro centro agora.', register: 'Cutoff' },
  { id: 's9', word: 'num', meaning: 'not / no (from nao)', example: 'Num sei nao, so.', register: 'Cutoff' },
  { id: 's10', word: 'memo', meaning: 'same / really (from mesmo)', example: 'E memo? Que trem!', register: 'Cutoff' },
  { id: 's11', word: 'vamo', meaning: 'let\'s go (from vamos)', example: 'Vamo la, ta na hora!', register: 'Cutoff' },
  { id: 's12', word: 'ja ja', meaning: 'in a little while / soon', example: 'Espera ai, ja ja eu chego.', register: 'Core Mineiro' },
  { id: 's13', word: 'demais / pacas', meaning: 'a lot / very much / too much', example: 'Esse cafe e gostoso demais!', register: 'Core Mineiro' },
  { id: 's14', word: 'veio / veia', meaning: 'old man / old woman (term of endearment)', example: 'Que e isso, veio? Ta bom?', register: 'Casual' },
  { id: 's15', word: 'deixa de besteira', meaning: 'stop being silly / don\'t be ridiculous', example: 'Deixa de besteira, ce consegue fazer isso.', register: 'Casual' },
  { id: 's16', word: 'pode contar comigo', meaning: 'you can count on me', example: 'Pode contar comigo, so, eu ajudo.', register: 'Core Mineiro' },
  { id: 's17', word: 'firmeza', meaning: 'alright / solid / for sure', example: 'Firmeza! A gente resolve isso.', register: 'Casual' },
  { id: 's18', word: 'maneiro', meaning: 'cool / awesome', example: 'Que trem maneiro, so!', register: 'Casual' },
  { id: 's19', word: 'mio', meaning: 'better (from melhor)', example: 'Assim ta mio, so.', register: 'Core Mineiro' },
  { id: 's20', word: 'pra caramba', meaning: 'a lot / like crazy', example: 'Trabalhei pra caramba essa semana.', register: 'Casual' },
  { id: 's21', word: 'faz tempo', meaning: 'it\'s been a while / long time no see', example: 'Uai, faz tempo que num te via!', register: 'Core Mineiro' },
  { id: 's22', word: 'que tal?', meaning: 'how about? / what do you think?', example: 'Que tal a gente ir no boteco?', register: 'Core Mineiro' },
  { id: 's23', word: 'vai la', meaning: 'go ahead / go for it', example: 'Vai la, pode falar, to te ouvindo.', register: 'Casual' },
  { id: 's24', word: 'to dentro', meaning: 'I\'m in / count me in', example: 'Rolinha no Savassi? To dentro!', register: 'Casual' },
  { id: 's25', word: 'bate o pe', meaning: 'insist / stand firm', example: 'Ele bate o pe que tem razao.', register: 'Casual' },
  { id: 's26', word: 'com certeza', meaning: 'definitely / for sure', example: 'Voce vai gostar do pao de queijo, com certeza.', register: 'Core Mineiro' },
  { id: 's27', word: 'ta bom demais', meaning: 'it\'s great / sounds perfect', example: 'Ta bom demais esse trem aqui!', register: 'Core Mineiro' },
  { id: 's28', word: 'uai so', meaning: 'well... (combo of uai+so, extra Mineiro)', example: 'Uai so, num entendi nao.', register: 'Core Mineiro' },
  { id: 's29', word: 'oxente', meaning: 'wow / expression of surprise (Nordeste but heard in MG)', example: 'Oxente! Isso aqui ta caro demais.', register: 'Casual' },
  { id: 's30', word: 'que saudade', meaning: 'I miss it so much / how I\'ve missed you', example: 'Que saudade, so! Faz tempo!', register: 'Core Mineiro' },
  { id: 's31', word: 'trocado', meaning: 'change (coins / small money)', example: 'Tem trocado pra me dar? So tenho nota grande.', register: 'Core Mineiro' },
  { id: 's32', word: 'cafezinho', meaning: 'little coffee (Mineiro diminutive culture)', example: 'Bora tomar um cafezinho la?', register: 'Diminutive' },
  { id: 's33', word: 'rapidinho', meaning: 'really quickly (diminutive)', example: 'Ja ja termino, e rapidinho.', register: 'Diminutive' },
  { id: 's34', word: 'pouquinho', meaning: 'just a little bit', example: 'So um pouquinho mais, por favor.', register: 'Diminutive' },
];

export const CUTOFFS = [
  { full: 'voce', reduced: 'ce', notes: 'Most common. Drop the "vo" entirely. "Ce ta bem?" = "You doing well?"' },
  { full: 'para', reduced: 'pra / pro', notes: '"Pra" before feminine nouns, "pro" before masculine. "Vou pra casa" / "Vou pro trabalho"' },
  { full: 'nao', reduced: 'num', notes: 'Used before verbs: "Num sei" = "I don\'t know". Keep "nao" at end of sentences.' },
  { full: 'esta / estou / estao', reduced: 'ta / to / tao', notes: 'Drop the "es-" entirely. "Ta bom?" "To indo." "Eles tao la."' },
  { full: 'mesmo', reduced: 'memo', notes: '"E memo?" = "Is that so?" / "Really?" Very characteristic Mineiro sound.' },
  { full: 'vamos', reduced: 'vamo', notes: 'Drop the final -s. "Vamo la!" = "Let\'s go!" Always sounds more natural.' },
  { full: 'estou indo', reduced: 'to indo', notes: 'Complete reduction. "To indo agora" = "I\'m going now"' },
  { full: 'esta bem', reduced: 'ta bom', notes: '"Ta bom!" = "Alright!" / "Sounds good!" Universal BH affirmation.' },
];

export const PRONUNCIATION_RULES = [
  {
    id: 'r1',
    title: 'Mineiro R',
    rule: 'In BH, the R at the start of words or after consonants is a soft "h" sound (like English "h"), not a guttural French R.',
    ipaApprox: '/h/ at start, /x/ or /h/ medial',
    spanishComparison: 'Like Spanish "j" (jota) but softer. "Rio" sounds like "HEE-oh" not the Spanish way.',
    examples: [{ word: 'Rio', phonetic: 'HEE-oh' }, { word: 'trabalho', phonetic: 'tra-BA-lhoh' }, { word: 'reuniao', phonetic: 'heh-oo-nee-AO' }]
  },
  {
    id: 'r2',
    title: 'T and D Affricates',
    rule: 'Before the vowel "i" (including final unstressed -e which sounds like "i"): T becomes "TCH" and D becomes "DJ". This is very characteristic of BH!',
    ipaApprox: 'T + /i/ = [tʃ], D + /i/ = [dʒ]',
    spanishComparison: 'No equivalent in Spanish. "Tia" does NOT sound like Spanish "tia" - it sounds like "CHEE-ah".',
    examples: [{ word: 'tia', phonetic: 'CHEE-ah' }, { word: 'dia', phonetic: 'DJEE-ah' }, { word: 'noite', phonetic: 'NOY-tchi' }]
  },
  {
    id: 'r3',
    title: 'Nasal Vowels',
    rule: 'Nasal vowels (with ~ or before n/m) are pronounced through the nose. Key nasal sounds: ao (like "owng"), em/em, im, om, um.',
    ipaApprox: '/ɐ̃w̃/, /ẽ/, /ĩ/, /õ/, /ũ/',
    spanishComparison: 'Spanish has no nasal vowels. "Nao" is not just "naow" - there is a nasal resonance: "nowNG".',
    examples: [{ word: 'nao', phonetic: 'nowNG' }, { word: 'bem', phonetic: 'bayNG' }, { word: 'um', phonetic: 'oong' }]
  },
  {
    id: 'r4',
    title: 'LH Palatal',
    rule: 'LH is a palatal lateral - similar to the "ll" in Spanish "calle" or "lli" in "million". It is a single sound, not L+H.',
    ipaApprox: '/ʎ/ - palatal lateral',
    spanishComparison: 'Like Spanish "ll" in "llamo" (for those who distinguish ll from y). "Trabalho" = tra-BA-lyo.',
    examples: [{ word: 'trabalho', phonetic: 'tra-BA-lyo' }, { word: 'filho', phonetic: 'FEE-lyo' }, { word: 'mulher', phonetic: 'moo-LYEH' }]
  },
  {
    id: 'r5',
    title: 'NH Palatal',
    rule: 'NH is a palatal nasal - like "ny" in "canyon" or Spanish "n" with tilde. It is a single nasal palatal sound.',
    ipaApprox: '/ɲ/ - palatal nasal',
    spanishComparison: 'Identical to Spanish "n" (en): "manana" = "manha". Great cognate pattern!',
    examples: [{ word: 'manha', phonetic: 'MA-nya' }, { word: 'ninho', phonetic: 'NEE-nyo' }, { word: 'sonho', phonetic: 'SO-nyo' }]
  },
  {
    id: 'r6',
    title: 'S and Z sounds',
    rule: 'S between vowels sounds like Z. S at end of words before voiced consonant = Z. X can be sh, s, z, or ks depending on the word.',
    ipaApprox: 'S intervocalic = /z/, X = /ʃ/ or /s/ or /z/ or /ks/',
    spanishComparison: 'Different from Spanish where S is always S. "Casa" in PT = "CA-zah" not "CA-sah".',
    examples: [{ word: 'casa', phonetic: 'CA-zah' }, { word: 'caixa', phonetic: 'KAI-sha' }, { word: 'exame', phonetic: 'eh-ZA-mi' }]
  },
  {
    id: 'r7',
    title: 'Vowel Reduction',
    rule: 'Unstressed vowels reduce: unstressed "o" at end of word sounds like "u", unstressed "e" sounds like "i". This is strong in BH.',
    ipaApprox: 'Unstressed o = /u/, unstressed e = /i/',
    spanishComparison: 'Spanish vowels stay full in all positions. PT reduces them dramatically. "Bonito" sounds like "bo-NEE-tu".',
    examples: [{ word: 'bonito', phonetic: 'bo-NEE-tu' }, { word: 'verde', phonetic: 'VEHR-dji' }, { word: 'leite', phonetic: 'LEY-tchi' }]
  },
  {
    id: 'r8',
    title: 'Mineiro Intonation',
    rule: 'Mineiro has a distinctive melodic, sing-song quality with rising intonation at end of phrases and elongated stressed vowels.',
    ipaApprox: 'Rising terminal intonation, lengthened stressed vowels',
    spanishComparison: 'More melodic than most Spanish dialects. Mineiro sounds "musical" even to other Brazilians.',
    examples: [{ word: 'uai...', phonetic: 'UAI (rising)' }, { word: 'ne?', phonetic: 'NEH (rising)' }, { word: 'so...', phonetic: 'SOH (elongated)' }]
  },
];

export const ES_PT_DIFFERENCES = [
  { id: 'd1', topic: 'Subject Pronouns', spanish: 'yo, tu, el, nosotros, vosotros, ellos', portuguese: 'eu, voce/tu, ele, nos, voces, eles', notes: 'No "vosotros" in PT - use "voces" for all plural. "Tu" is formal in some regions of PT but informal in Brazil.' },
  { id: 'd2', topic: 'Verb "to be"', spanish: 'ser, estar (same as PT)', portuguese: 'ser, estar (same as ES)', notes: 'Same distinction! Ser=permanent, Estar=temporary. Easier crossover.' },
  { id: 'd3', topic: 'Object pronouns', spanish: 'lo/la (direct), le (indirect)', portuguese: 'o/a (direct), lhe (indirect)', notes: 'PT uses clitic placement differently. Colloquially: "Eu te vi" not "Eu vi-te".' },
  { id: 'd4', topic: 'Articles', spanish: 'el, la, los, las', portuguese: 'o, a, os, as', notes: 'Portuguese uses articles before proper names more: "A Maria chegou" = natural PT, weird ES.' },
  { id: 'd5', topic: 'Future tense', spanish: 'hablare, comere (synthetic)', portuguese: 'vou falar, vou comer (analytical)', notes: 'In Brazil, synthetic future is rare in speech. Always "vou + infinitive" in conversation.' },
  { id: 'd6', topic: 'Diminutives', spanish: '-ito/-ita (cafe -> cafecito)', portuguese: '-inho/-inha (cafe -> cafezinho)', notes: 'Portuguese uses diminutives MORE frequently and with different emotional shades. Very Mineiro!' },
  { id: 'd7', topic: 'Negation', spanish: 'no (before verb)', portuguese: 'nao (before verb) OR "num" (BH)', notes: 'PT can do double negation: "Nao vi nao" = I really did not see it. BH loves "num sei nao".' },
  { id: 'd8', topic: 'Progressive', spanish: 'estar + gerundio (-ando)', portuguese: 'estar + gerundio (-ando) OR "a + infinitive" (PT)', notes: 'In Brazil: "estou falando" (gerund). In Portugal: "estou a falar" (infinitive). Brazil = closer to Spanish.' },
  { id: 'd9', topic: 'Preposition contractions', spanish: 'de + el = del, a + el = al', portuguese: 'de + o = do, a + o = ao, em + o = no', notes: 'PT has many more contractions: de+a=da, em+a=na, por+o=pelo, para+o=pro (BH spoken).' },
  { id: 'd10', topic: 'Verb "to like"', spanish: 'gustar (me gusta)', portuguese: 'gostar de (eu gosto de)', notes: 'Major structure difference! PT uses active: "Eu gosto de musica" not reversed like ES "me gusta".' },
  { id: 'd11', topic: 'Question formation', spanish: 'Invert verb: Hablas espanol?', portuguese: 'Keep order, use intonation: Voce fala portugues?', notes: 'PT rarely inverts. Questions formed by intonation only. Much simpler!' },
  { id: 'd12', topic: 'Vocabulary false friends', spanish: 'embarazada=pregnant, borracha=drunk', portuguese: 'embaracosa=embarrassing, borracha=rubber', notes: 'Many false friends. "Polvo"=octopus (PT) not dust (ES). "Exquisito"=weird (PT) not exquisite (ES).' },
];

export const FALSE_FRIENDS = [
  { word: 'borracha', esMeaning: 'drunk woman', ptMeaning: 'rubber / eraser', warning: 'Do not call someone a borracha! Ask for a borracha to erase with.' },
  { word: 'embaracoso', esMeaning: 'pregnant (embarazada)', ptMeaning: 'embarrassing / awkward', warning: 'Embaracoso in PT = awkward/embarrassing. Pregnant = gravida in PT.' },
  { word: 'polvo', esMeaning: 'dust', ptMeaning: 'octopus', warning: 'At a seafood restaurant, polvo is octopus, not dusty food.' },
  { word: 'esquisito', esMeaning: 'exquisite / delicious', ptMeaning: 'weird / strange', warning: 'Saying food is esquisito in PT means you find it weird, not delicious!' },
  { word: 'exito', esMeaning: 'success', ptMeaning: 'exit (saida is success)', warning: 'Exito in PT = exit. Success = sucesso or resultado. A common mistake.' },
  { word: 'largo', esMeaning: 'long', ptMeaning: 'wide / broad', warning: 'Largo in PT = wide. Long = comprido/longo. "Uma rua larga" = a wide street.' },
  { word: 'bordar', esMeaning: 'to go over the edge / to border', ptMeaning: 'to embroider', warning: 'Bordar in PT = to embroider fabric. Very different from the ES meaning.' },
  { word: 'vaso', esMeaning: 'vase / cup', ptMeaning: 'toilet / flower vase', warning: 'Vaso can mean toilet in PT! "Vaso sanitario" is the full term. Do not confuse.' },
  { word: 'policia', esMeaning: 'police (familiar)', ptMeaning: 'police (same but usage differs)', warning: 'Very similar but PT uses it slightly more formally in some contexts.' },
];

export const GRAMMAR_GAPS = [
  { id: 'g1', title: 'Personal Infinitive', explanation: 'PT has a unique "personal infinitive" that conjugates: useful for complex sentences. Spanish has no equivalent.', examples: [{ es: 'Para ir', pt: 'Para irmos (we)', note: '"Para irmos" specifies "we" even in infinitive form' }] },
  { id: 'g2', title: 'Future Subjunctive', explanation: 'PT has a future subjunctive used with "quando" (when) for future events. Spanish also has it but uses it less. Very common in PT.', examples: [{ es: 'Cuando llegue', pt: 'Quando chegar', note: 'Both use subjunctive after "when" for future. Same structure!' }] },
  { id: 'g3', title: 'Contractions with articles', explanation: 'PT contracts prepositions with articles constantly: de+o=do, em+o=no, por+o=pelo. Spanish only has del and al.', examples: [{ es: 'Voy a la tienda', pt: 'Vou a loja / Vou a loja', note: 'No contraction in PT with "a" + feminine, but de+a=da, em+a=na.' }] },
  { id: 'g4', title: 'Clitic Placement', explanation: 'PT clitics (object pronouns) attach differently than ES. In colloquial BR Portuguese, they often come BEFORE the verb.', examples: [{ es: 'Te llamo manana', pt: 'Te ligo amanha / Vou te ligar', note: 'Both "te" before verb are natural in spoken BR Portuguese' }] },
  { id: 'g5', title: '"Ficar" multipurpose verb', explanation: '"Ficar" means to stay, to become, to remain, to end up. No single ES equivalent - context dependent.', examples: [{ es: 'Quedarse / Ponerse / Volverse', pt: 'Ficar', note: '"Fiquei triste" = I became sad. "Fica la" = Stay there.' }] },
  { id: 'g6', title: 'Gostar de structure', explanation: '"Gostar" requires "de" and uses active voice. Very different from Spanish "gustar" which reverses subject/object.', examples: [{ es: 'Me gusta el cafe (coffee is subject)', pt: 'Eu gosto de cafe (I am subject)', note: 'PT active: Eu gosto de cafe. ES passive: Me gusta el cafe.' }] },
  { id: 'g7', title: 'Diminutives carry emotion', explanation: 'PT diminutives (-inho/-inha) carry affection, softness, smallness. Much more common than ES -ito/-ita. Mineiros use them constantly.', examples: [{ es: 'Un cafecito', pt: 'Um cafezinho', note: 'Cafezinho is so embedded in PT it has its own cultural meaning.' }] },
  { id: 'g8', title: 'Present continuous', explanation: 'BR Portuguese uses present progressive extensively for ongoing actions. "Estou fazendo" = I am doing. Very natural.', examples: [{ es: 'Estoy haciendo', pt: 'Estou fazendo', note: 'Same structure! BR Portuguese = Spanish here. Just different conjugation.' }] },
];
