const prompt = require('prompt')

import { VocabularyList } from './vocabulary/vocabulary.class'
import { config } from './config'

import * as les1 from './lists/les1.json'
import * as les2 from './lists/les2.json'
import * as les3 from './lists/les3.json'

const main = async () => {
    prompt.start()
    const vocabularyList = new VocabularyList(prompt, config.askingLanguage)
    vocabularyList.importLesson(les1)
    vocabularyList.importLesson(les2)
    vocabularyList.importLesson(les3)

    await vocabularyList.runTrainer(config.rounds)
}

main()
