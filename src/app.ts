const prompt = require('prompt')

import { Lesson } from './vocabulary/vocabulary.types'
import { VocabularyList } from './vocabulary/vocabulary.class'
import { config } from './config'

import * as les1Import from './lists/les1.json'
import * as les2Import from './lists/les2.json'
import * as les3Import from './lists/les3.json'

let les1: Lesson = <Lesson>les1Import
let les2: Lesson = <Lesson>les2Import
let les3: Lesson = <Lesson>les3Import

const main = async () => {
    prompt.start()
    const vocabularyList = new VocabularyList(prompt, config.askingLanguage)
    vocabularyList.importLesson(les1)
    vocabularyList.importLesson(les2)
    vocabularyList.importLesson(les3)

    await vocabularyList.runTrainer(config.rounds)
}

main()
