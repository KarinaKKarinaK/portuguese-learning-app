export const TENSES = [
  {
    id: 'presente',
    name: 'Presente',
    whenToUse: 'Used for current states, habitual actions, and universal truths. In BH, also used for planned near-future events.',
    bhExample: 'Toda manha eu tomo um cafezinho na padaria la do bairro.',
    arEndings: ['-o', '-as', '-a', '-amos', '-am'],
    erEndings: ['-o', '-es', '-e', '-emos', '-em'],
    irEndings: ['-o', '-es', '-e', '-imos', '-em'],
    irregulars: [
      { verb: 'ser', eu: 'sou', tu: 'es', ele: 'e', nos: 'somos', eles: 'sao', notes: 'totally-irregular' },
      { verb: 'estar', eu: 'estou', tu: 'estas', ele: 'esta', nos: 'estamos', eles: 'estao', notes: 'totally-irregular' },
      { verb: 'ter', eu: 'tenho', tu: 'tens', ele: 'tem', nos: 'temos', eles: 'tem', notes: 'totally-irregular' },
      { verb: 'ir', eu: 'vou', tu: 'vais', ele: 'vai', nos: 'vamos', eles: 'vao', notes: 'totally-irregular' },
      { verb: 'fazer', eu: 'faco', tu: 'fazes', ele: 'faz', nos: 'fazemos', eles: 'fazem', notes: 'orthographic' },
      { verb: 'poder', eu: 'posso', tu: 'podes', ele: 'pode', nos: 'podemos', eles: 'podem', notes: 'stem-changing' },
      { verb: 'querer', eu: 'quero', tu: 'queres', ele: 'quer', nos: 'queremos', eles: 'querem', notes: 'stem-changing' },
      { verb: 'saber', eu: 'sei', tu: 'sabes', ele: 'sabe', nos: 'sabemos', eles: 'sabem', notes: 'totally-irregular' },
      { verb: 'vir', eu: 'venho', tu: 'vens', ele: 'vem', nos: 'vimos', eles: 'vem', notes: 'totally-irregular' },
      { verb: 'ver', eu: 'vejo', tu: 'ves', ele: 've', nos: 'vemos', eles: 'veem', notes: 'orthographic' },
      { verb: 'dar', eu: 'dou', tu: 'das', ele: 'da', nos: 'damos', eles: 'dao', notes: 'totally-irregular' },
      { verb: 'dizer', eu: 'digo', tu: 'dizes', ele: 'diz', nos: 'dizemos', eles: 'dizem', notes: 'stem-changing' },
    ],
    mineiroPractice: {
      title: 'Presente Mineiro',
      examples: [
        { form: 'Eu to indo', meaning: 'I am going (right now)' },
        { form: 'Ce ta bem?', meaning: 'Are you well?' },
        { form: 'A gente vai la', meaning: 'We are going there' },
        { form: 'Num tem problema', meaning: 'There is no problem' },
      ]
    }
  },
  {
    id: 'perfeito',
    name: 'Preterito Perfeito',
    whenToUse: 'Completed past actions with a clear endpoint. The main past tense used in speech in Brazil.',
    bhExample: 'Ontem eu fui no Mercado Central e comi um pastel barao. Foi otimo!',
    arEndings: ['-ei', '-aste', '-ou', '-amos', '-aram'],
    erEndings: ['-i', '-este', '-eu', '-emos', '-eram'],
    irEndings: ['-i', '-iste', '-iu', '-imos', '-iram'],
    irregulars: [
      { verb: 'ser/ir', eu: 'fui', tu: 'foste', ele: 'foi', nos: 'fomos', eles: 'foram', notes: 'totally-irregular' },
      { verb: 'estar', eu: 'estive', tu: 'estiveste', ele: 'esteve', nos: 'estivemos', eles: 'estiveram', notes: 'totally-irregular' },
      { verb: 'ter', eu: 'tive', tu: 'tiveste', ele: 'teve', nos: 'tivemos', eles: 'tiveram', notes: 'totally-irregular' },
      { verb: 'fazer', eu: 'fiz', tu: 'fizeste', ele: 'fez', nos: 'fizemos', eles: 'fizeram', notes: 'totally-irregular' },
      { verb: 'poder', eu: 'pude', tu: 'pudeste', ele: 'pode', nos: 'pudemos', eles: 'puderam', notes: 'stem-changing' },
      { verb: 'querer', eu: 'quis', tu: 'quiseste', ele: 'quis', nos: 'quisemos', eles: 'quiseram', notes: 'totally-irregular' },
      { verb: 'saber', eu: 'soube', tu: 'soubeste', ele: 'soube', nos: 'soubemos', eles: 'souberam', notes: 'totally-irregular' },
      { verb: 'vir', eu: 'vim', tu: 'vieste', ele: 'veio', nos: 'viemos', eles: 'vieram', notes: 'totally-irregular' },
      { verb: 'ver', eu: 'vi', tu: 'viste', ele: 'viu', nos: 'vimos', eles: 'viram', notes: 'totally-irregular' },
      { verb: 'dar', eu: 'dei', tu: 'deste', ele: 'deu', nos: 'demos', eles: 'deram', notes: 'totally-irregular' },
      { verb: 'dizer', eu: 'disse', tu: 'disseste', ele: 'disse', nos: 'dissemos', eles: 'disseram', notes: 'totally-irregular' },
      { verb: 'trazer', eu: 'trouxe', tu: 'trouxeste', ele: 'trouxe', nos: 'trouxemos', eles: 'trouxeram', notes: 'totally-irregular' },
    ],
    mineiroPractice: {
      title: 'Perfeito Mineiro na Pratica',
      examples: [
        { form: 'Fui la e resolvi', meaning: 'I went there and solved it' },
        { form: 'Ce foi no boteco ontem?', meaning: 'Did you go to the bar yesterday?' },
        { form: 'A gente foi junto', meaning: 'We went together' },
      ]
    }
  },
  {
    id: 'imperfeito',
    name: 'Imperfeito',
    whenToUse: 'Ongoing or habitual past actions, background descriptions, and polite requests. Less common in BH speech but still important.',
    bhExample: 'Quando eu morava em BH, ia na padaria toda manha. Era otimo!',
    arEndings: ['-ava', '-avas', '-ava', '-avamos', '-avam'],
    erEndings: ['-ia', '-ias', '-ia', '-iamos', '-iam'],
    irEndings: ['-ia', '-ias', '-ia', '-iamos', '-iam'],
    irregulars: [
      { verb: 'ser', eu: 'era', tu: 'eras', ele: 'era', nos: 'eramos', eles: 'eram', notes: 'totally-irregular' },
      { verb: 'ter', eu: 'tinha', tu: 'tinhas', ele: 'tinha', nos: 'tinhamos', eles: 'tinham', notes: 'totally-irregular' },
      { verb: 'vir', eu: 'vinha', tu: 'vinhas', ele: 'vinha', nos: 'vinhamos', eles: 'vinham', notes: 'totally-irregular' },
      { verb: 'ir', eu: 'ia', tu: 'ias', ele: 'ia', nos: 'iamos', eles: 'iam', notes: 'totally-irregular' },
      { verb: 'ver', eu: 'via', tu: 'vias', ele: 'via', nos: 'viamos', eles: 'viam', notes: 'totally-irregular' },
      { verb: 'por', eu: 'punha', tu: 'punhas', ele: 'punha', nos: 'punhamos', eles: 'punham', notes: 'totally-irregular' },
      { verb: 'fazer', eu: 'fazia', tu: 'fazias', ele: 'fazia', nos: 'faziamos', eles: 'faziam', notes: 'regular-er' },
      { verb: 'querer', eu: 'queria', tu: 'querias', ele: 'queria', nos: 'queriamos', eles: 'queriam', notes: 'regular-er' },
      { verb: 'saber', eu: 'sabia', tu: 'sabias', ele: 'sabia', nos: 'sabiamos', eles: 'sabiam', notes: 'regular-er' },
      { verb: 'poder', eu: 'podia', tu: 'podias', ele: 'podia', nos: 'podiamos', eles: 'podiam', notes: 'regular-er' },
      { verb: 'estar', eu: 'estava', tu: 'estavas', ele: 'estava', nos: 'estavamos', eles: 'estavam', notes: 'regular-ar' },
      { verb: 'dar', eu: 'dava', tu: 'davas', ele: 'dava', nos: 'davamos', eles: 'davam', notes: 'regular-ar' },
    ],
    mineiroPractice: {
      title: 'Imperfeito - Usos Comuns',
      examples: [
        { form: 'Queria um cafezinho', meaning: 'I would like a coffee (polite)' },
        { form: 'Antes eu morava la', meaning: 'I used to live there' },
        { form: 'Era bom demais!', meaning: 'It was great!' },
      ]
    }
  },
  {
    id: 'futuro',
    name: 'Futuro',
    whenToUse: 'In BH speech: use "ir + infinitive" for near future. Written/formal: use -rei/-ra endings. Both are correct.',
    bhExample: 'Amanha vou resolver esse problema. A empresa vai crescer bastante esse ano.',
    arEndings: ['-arei', '-aras', '-ara', '-aremos', '-arao'],
    erEndings: ['-erei', '-eras', '-era', '-eremos', '-erao'],
    irEndings: ['-irei', '-iras', '-ira', '-iremos', '-irao'],
    irregulars: [
      { verb: 'ser', eu: 'serei', tu: 'seras', ele: 'sera', nos: 'seremos', eles: 'serao', notes: 'regular' },
      { verb: 'ter', eu: 'terei', tu: 'teras', ele: 'tera', nos: 'teremos', eles: 'terao', notes: 'regular' },
      { verb: 'fazer', eu: 'farei', tu: 'faras', ele: 'fara', nos: 'faremos', eles: 'farao', notes: 'stem-changing' },
      { verb: 'dizer', eu: 'direi', tu: 'diras', ele: 'dira', nos: 'diremos', eles: 'dirao', notes: 'stem-changing' },
      { verb: 'trazer', eu: 'trarei', tu: 'traras', ele: 'trara', nos: 'traremos', eles: 'trarao', notes: 'stem-changing' },
      { verb: 'querer', eu: 'quererei', tu: 'quereras', ele: 'quera', nos: 'quereremos', eles: 'quererao', notes: 'regular' },
      { verb: 'poder', eu: 'poderei', tu: 'poderas', ele: 'podera', nos: 'poderemos', eles: 'poderao', notes: 'regular' },
      { verb: 'vir', eu: 'virei', tu: 'viras', ele: 'vira', nos: 'viremos', eles: 'virao', notes: 'regular' },
      { verb: 'ir', eu: 'irei', tu: 'iras', ele: 'ira', nos: 'iremos', eles: 'irao', notes: 'regular' },
      { verb: 'ver', eu: 'verei', tu: 'veras', ele: 'vera', nos: 'veremos', eles: 'verao', notes: 'regular' },
      { verb: 'dar', eu: 'darei', tu: 'daras', ele: 'dara', nos: 'daremos', eles: 'darao', notes: 'regular' },
      { verb: 'saber', eu: 'saberei', tu: 'saberas', ele: 'sabera', nos: 'saberemos', eles: 'saberao', notes: 'regular' },
    ],
    mineiroPractice: {
      title: 'Futuro na Fala Mineira',
      examples: [
        { form: 'Vou la depois', meaning: 'I will go there later (spoken)' },
        { form: 'Isso vai dar certo', meaning: 'This will work out' },
        { form: 'A gente vai resolver', meaning: 'We will solve it' },
        { form: 'Nao vai demorar', meaning: 'It will not take long' },
      ]
    }
  },
  {
    id: 'subjuntivo',
    name: 'Presente do Subjuntivo',
    whenToUse: 'Used after expressions of doubt, emotion, wish, necessity. Key triggers: quero que, espero que, e importante que, talvez, quando (future).',
    bhExample: 'Espero que o projeto de certo. E importante que a gente entregue no prazo.',
    arEndings: ['-e', '-es', '-e', '-emos', '-em'],
    erEndings: ['-a', '-as', '-a', '-amos', '-am'],
    irEndings: ['-a', '-as', '-a', '-amos', '-am'],
    irregulars: [
      { verb: 'ser', eu: 'seja', tu: 'sejas', ele: 'seja', nos: 'sejamos', eles: 'sejam', notes: 'totally-irregular' },
      { verb: 'estar', eu: 'esteja', tu: 'estejas', ele: 'esteja', nos: 'estejamos', eles: 'estejam', notes: 'totally-irregular' },
      { verb: 'ter', eu: 'tenha', tu: 'tenhas', ele: 'tenha', nos: 'tenhamos', eles: 'tenham', notes: 'totally-irregular' },
      { verb: 'ir', eu: 'va', tu: 'vas', ele: 'va', nos: 'vamos', eles: 'vao', notes: 'totally-irregular' },
      { verb: 'fazer', eu: 'faca', tu: 'facas', ele: 'faca', nos: 'facamos', eles: 'facam', notes: 'orthographic' },
      { verb: 'poder', eu: 'possa', tu: 'possas', ele: 'possa', nos: 'possamos', eles: 'possam', notes: 'stem-changing' },
      { verb: 'querer', eu: 'queira', tu: 'queiras', ele: 'queira', nos: 'queiramos', eles: 'queiram', notes: 'stem-changing' },
      { verb: 'saber', eu: 'saiba', tu: 'saibas', ele: 'saiba', nos: 'saibamos', eles: 'saibam', notes: 'totally-irregular' },
      { verb: 'vir', eu: 'venha', tu: 'venhas', ele: 'venha', nos: 'venhamos', eles: 'venham', notes: 'totally-irregular' },
      { verb: 'ver', eu: 'veja', tu: 'vejas', ele: 'veja', nos: 'vejamos', eles: 'vejam', notes: 'orthographic' },
      { verb: 'dar', eu: 'de', tu: 'des', ele: 'de', nos: 'demos', eles: 'dem', notes: 'totally-irregular' },
      { verb: 'dizer', eu: 'diga', tu: 'digas', ele: 'diga', nos: 'digamos', eles: 'digam', notes: 'stem-changing' },
    ],
    mineiroPractice: {
      title: 'Subjuntivo - Expressoes Comuns',
      examples: [
        { form: 'Espero que de certo', meaning: 'I hope it works out' },
        { form: 'Quero que ce venha', meaning: 'I want you to come' },
        { form: 'E bom que a gente resolva', meaning: 'It is good that we resolve it' },
        { form: 'Talvez seja melhor assim', meaning: 'Maybe it is better this way' },
      ]
    }
  }
];

export const KEY_IRREGULARS = [
  { verb: 'ser', presente: 'sou/es/e/somos/sao', perfeito: 'fui/foste/foi/fomos/foram', imperfeito: 'era/eras/era/eramos/eram', type: 'totally-irregular' },
  { verb: 'estar', presente: 'estou/estas/esta/estamos/estao', perfeito: 'estive/estiveste/esteve', imperfeito: 'estava/estavas', type: 'totally-irregular' },
  { verb: 'ter', presente: 'tenho/tens/tem/temos/tem', perfeito: 'tive/tiveste/teve', imperfeito: 'tinha/tinhas', type: 'totally-irregular' },
  { verb: 'ir', presente: 'vou/vais/vai/vamos/vao', perfeito: 'fui/foste/foi', imperfeito: 'ia/ias', type: 'totally-irregular' },
  { verb: 'fazer', presente: 'faco/fazes/faz/fazemos/fazem', perfeito: 'fiz/fizeste/fez', imperfeito: 'fazia/fazias', type: 'orthographic' },
  { verb: 'poder', presente: 'posso/podes/pode/podemos/podem', perfeito: 'pude/pudeste/pode', imperfeito: 'podia/podias', type: 'stem-changing' },
  { verb: 'querer', presente: 'quero/queres/quer/queremos/querem', perfeito: 'quis/quiseste/quis', imperfeito: 'queria/querias', type: 'stem-changing' },
  { verb: 'saber', presente: 'sei/sabes/sabe/sabemos/sabem', perfeito: 'soube/soubeste/soube', imperfeito: 'sabia/sabias', type: 'totally-irregular' },
  { verb: 'vir', presente: 'venho/vens/vem/vimos/vem', perfeito: 'vim/vieste/veio', imperfeito: 'vinha/vinhas', type: 'totally-irregular' },
  { verb: 'ver', presente: 'vejo/ves/ve/vemos/veem', perfeito: 'vi/viste/viu', imperfeito: 'via/vias', type: 'orthographic' },
  { verb: 'dar', presente: 'dou/das/da/damos/dao', perfeito: 'dei/deste/deu', imperfeito: 'dava/davas', type: 'totally-irregular' },
  { verb: 'dizer', presente: 'digo/dizes/diz/dizemos/dizem', perfeito: 'disse/disseste/disse', imperfeito: 'dizia/dizias', type: 'stem-changing' },
  { verb: 'trazer', presente: 'trago/trazes/traz/trazemos/trazem', perfeito: 'trouxe/trouxeste/trouxe', imperfeito: 'trazia/trazias', type: 'totally-irregular' },
  { verb: 'por', presente: 'ponho/poes/poe/pomos/poem', perfeito: 'pus/puseste/pos', imperfeito: 'punha/punhas', type: 'totally-irregular' },
  { verb: 'caber', presente: 'caibo/cabes/cabe/cabemos/cabem', perfeito: 'coube/coubeste/coube', imperfeito: 'cabia/cabias', type: 'stem-changing' },
  { verb: 'ouvir', presente: 'ouco/ouves/ouve/ouvimos/ouvem', perfeito: 'ouvi/ouviste/ouviu', imperfeito: 'ouvia/ouvias', type: 'orthographic' },
  { verb: 'pedir', presente: 'peco/pedes/pede/pedimos/pedem', perfeito: 'pedi/pediste/pediu', imperfeito: 'pedia/pedias', type: 'stem-changing' },
  { verb: 'medir', presente: 'meco/medes/mede/medimos/medem', perfeito: 'medi/mediste/mediu', imperfeito: 'media/medias', type: 'stem-changing' },
  { verb: 'sentir', presente: 'sinto/sentes/sente/sentimos/sentem', perfeito: 'senti/sentiste/sentiu', imperfeito: 'sentia/sentias', type: 'stem-changing' },
  { verb: 'dormir', presente: 'durmo/dormes/dorme/dormimos/dormem', perfeito: 'dormi/dormiste/dormiu', imperfeito: 'dormia/dormias', type: 'stem-changing' },
];
