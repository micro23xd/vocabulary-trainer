import { Language } from './vocabulary/vocabulary.types'

type Config = {
    // Which language will be asked
    // Default: 'nl'
    askingLanguage: Language
    // How many words should be trained
    // Default: 10
    rounds: number
    // Show lesson and category
    // Default: true
    showHint: boolean
    // Only play certain lessons of 1-10
    // Default: [] (all lessons)
    selectiveLessons?: number[]
}

const defaultConfig = {
    askingLanguage: 'nl',
    rounds: 10,
    showHint: true,
    // selectiveLessons: [1, 2, 3],
} as Config

const quickConfig = {
    askingLanguage: 'nl',
    rounds: 3,
    showHint: true,
    // selectiveLessons: [1, 2, 3],
} as Config

export { Config, defaultConfig, quickConfig }
