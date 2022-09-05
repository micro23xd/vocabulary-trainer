import { Language } from './vocabulary/vocabulary.types'

type Config = {
    rounds: number
    askingLanguage: Language
}

const config = {
    askingLanguage: 'nl',
    rounds: 5,
} as Config

export { Config, config }
