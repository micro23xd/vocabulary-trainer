import { Language, Lesson, WordPair } from './vocabulary.types'

export class VocabularyList {
    private readonly words: WordPair[] = []

    constructor(
        private prompt: any,
        private readonly askingLanguage: Language
    ) {}

    public importLesson(list: Lesson): void {
        this.words.push(...list.words)
    }

    private getRandomWordPair(): { wordPair: WordPair; index: number } {
        const index = Math.floor(Math.random() * this.words.length)
        return {
            wordPair: this.words[index],
            index,
        }
    }

    private static cleanWord(word: string): string {
        return word
            .replace('?', '') // remove question mark
            .replace(/\([^()]*\)/g, '') // remove parenthesis
            .replace(/\s+/g, '') // remove whitespace
            .toLowerCase()
    }

    private getPromptLanguage(): Language {
        return this.askingLanguage === 'en' ? 'nl' : 'en'
    }

    public async testVocabulary(): Promise<boolean> {
        if (this.words.length === 0) {
            console.log('No words to test')
            return false
        }

        const { wordPair, index } = this.getRandomWordPair()
        console.log(`Translate: ${wordPair[this.getPromptLanguage()]}`)
        const result = await this.prompt.get([this.askingLanguage])

        const correct =
            VocabularyList.cleanWord(result[this.askingLanguage]) ===
            VocabularyList.cleanWord(wordPair[this.askingLanguage])

        console.log(`You were ${correct ? 'correct' : 'incorrect'}!`)
        console.log(`The correct answer is: ${wordPair[this.askingLanguage]}`)
        console.log('')

        if (correct) this.words.splice(index, 1)
        return correct
    }

    public async runTrainer(rounds: number): Promise<void> {
        let index = 1
        let correct = 0
        let incorrect = 0

        process.on('exit', function () {
            const score = Math.round((correct / (correct + incorrect)) * 100)
            const sentiment = score >= 60 ? '🚀' : '🤯'

            console.log(
                `\n${sentiment} You got a score of ${score}% (${correct} correct and ${incorrect} incorrect answers)`
            )
        })

        while (index <= rounds) {
            console.log(`Round ${index} of ${rounds}`)
            ;(await this.testVocabulary()) ? correct++ : incorrect++
            index++
        }
    }
}
