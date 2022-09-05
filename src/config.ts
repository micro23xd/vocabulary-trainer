import { Language } from './vocabulary/vocabulary.types'

type Config = {
    rounds: number
    askingLanguage: Language
    folder: string
}

const config = {
    askingLanguage: 'nl',
    rounds: 5,
    folder: './src/lists',
} as Config

export { Config, config }
