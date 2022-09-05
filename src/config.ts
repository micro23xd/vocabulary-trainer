import { Language } from './vocabulary/vocabulary.types'

type Config = {
    rounds: number
    askingLanguage: Language
    folder: string
    showHint: boolean
    selectiveLessons?: number[]
}

const config = {
    askingLanguage: 'nl',
    rounds: 10,
    folder: './src/lists',
    showHint: true,
    // selectiveLessons: [1, 2, 3],
} as Config

export { Config, config }
