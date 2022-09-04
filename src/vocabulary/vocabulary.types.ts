export type Language = 'en' | 'nl'

export interface Lesson {
    id: string
    description: string
    words: WordPair[]
}

export interface WordPair {
    nl: string
    nlArticle?: string
    en: string
}

export type VocabularyList = Lesson[]
