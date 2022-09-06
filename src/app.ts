import { WordPair } from './vocabulary/vocabulary.types'

const prompt = require('prompt')

import { VocabularyTrainer } from './vocabulary/vocabulary.class'
import { defaultConfig, quickConfig } from './config'

import * as wordlist from './lists/words.json'

const main = async () => {
    const config = process.argv[2] === '--quick' ? quickConfig : defaultConfig

    prompt.start()
    const vocabularyList = new VocabularyTrainer(prompt, config)
    vocabularyList.importLesson(wordlist.words as WordPair[])

    await vocabularyList.runTrainer()
}

main()
