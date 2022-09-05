import { Language } from './vocabulary/vocabulary.types'

type Config = {
    rounds: number
    askingLanguage: Language
    folder: string
    showHint: boolean
}

const config = {
    askingLanguage: 'nl',
    rounds: 5,
    folder: './src/lists',
    showHint: true,
} as Config

export { Config, config }
