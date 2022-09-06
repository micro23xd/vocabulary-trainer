import { WordPair } from './vocabulary/vocabulary.types'

const prompt = require('prompt')

import { VocabularyTrainer } from './vocabulary/vocabulary.class'
import { defaultConfig, quickConfig } from './config'

import * as wordlist from './lists/words.json'

const main = async () => {
    const config = process.argv.includes('--quick') ? quickConfig : defaultConfig

    if (process.argv.includes('--no-end')) config.rounds = 0

    prompt.start()
    const vocabularyList = new VocabularyTrainer(prompt, config)
    vocabularyList.importLesson(wordlist.words as WordPair[])

    await vocabularyList.runTrainer()
}

main()
