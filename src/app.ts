const prompt = require('prompt')

import { Lesson } from './vocabulary/vocabulary.types'

import * as les1Import from './lists/les1.json'
import { VocabularyList } from './vocabulary/vocabulary.class'
let les1: Lesson = <Lesson>les1Import

const main = async () => {
    prompt.start()
    const vocabularyList = new VocabularyList(prompt, 'nl')
    vocabularyList.importLesson(les1)
    vocabularyList.testVocabulary()
}

main()