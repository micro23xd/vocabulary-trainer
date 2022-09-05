import { WordPair } from './vocabulary/vocabulary.types'

const prompt = require('prompt')

import { VocabularyList } from './vocabulary/vocabulary.class'
import { config } from './config'

import * as wordlist from './lists/words.json'

const main = async () => {
    prompt.start()
    const vocabularyList = new VocabularyList(prompt, config)
    vocabularyList.importLesson(wordlist.words as WordPair[])

    await vocabularyList.runTrainer()
}

main()
