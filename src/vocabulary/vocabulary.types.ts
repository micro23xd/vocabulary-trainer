export type Language = 'en' | 'nl'

export interface WordPair {
    nl: string
    nlAlternative?: string
    en: string
    category: string
    lesson: number
}

export type VocabularyList = WordPair[]
