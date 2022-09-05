const prompt = require('prompt')
import * as fs from 'node:fs';

import { VocabularyList } from './vocabulary/vocabulary.class'
import { Lesson } from "./vocabulary/vocabulary.types";
import { config } from './config'


const importLessons = async (): Promise<Lesson[]> => {
    const files = fs.readdirSync(config.folder)
    return files.map((file) => {
        const content = fs.readFileSync(`${config.folder}/${file}`, 'utf8')
        return JSON.parse(content) as Lesson
    })
}

const main = async () => {
    prompt.start()
    const vocabularyList = new VocabularyList(prompt, config.askingLanguage)
    const lists = await importLessons()
    lists.forEach((list ) => vocabularyList.importLesson(list))

    await vocabularyList.runTrainer(config.rounds)
}

main()
