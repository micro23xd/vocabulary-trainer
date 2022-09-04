import { Language, Lesson, WordPair } from './vocabulary.types'

export class VocabularyList {
    private readonly words: WordPair[] = []
    private readonly lessonIds: string[] = []

    constructor(
        private prompt: any,
        private readonly askingLanguage: Language
    ) {}

    public importLesson(list: Lesson): void {
        this.words.push(...list.words)
        this.lessonIds.push(list.id)
    }

    private getRandomWordPair(): WordPair {
        const index = Math.floor(Math.random() * this.words.length)
        return this.words[index]
    }

    private static cleanWord(word: string): string {
        return word.replace('?', '').toLowerCase()
    }

    private getPromptLanguage(): Language {
        return this.askingLanguage === 'en' ? 'nl' : 'en'
    }

    public testVocabulary(): boolean {
        if (this.words.length === 0) {
            console.log('No words to test')
            return false
        }

        const wordPair = this.getRandomWordPair()
        console.log(`Translate: ${wordPair[this.getPromptLanguage()]}`)
        return this.prompt.get(
            [this.askingLanguage],
            (err: Error | null, result: { [key: string]: string }) => {
                if (err) {
                    console.error(err)
                    return false
                }
                const correct =
                    VocabularyList.cleanWord(result[this.askingLanguage]) ===
                    VocabularyList.cleanWord(wordPair[this.askingLanguage])

                console.log(`You were ${correct ? 'correct!' : 'incorrect!'}`)
                if (!correct) {
                    console.log(
                        `The correct answer is: ${
                            wordPair[this.askingLanguage]
                        }`
                    )
                }

                return correct
            }
        )
    }
}
