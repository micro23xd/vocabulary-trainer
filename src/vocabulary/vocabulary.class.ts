import { Language, WordPair } from './vocabulary.types'
import { Config } from '../config'

export class VocabularyTrainer {
    private readonly words: WordPair[] = []
    private readonly askingLanguage: Language

    constructor(private prompt: any, private readonly config: Config) {
        this.askingLanguage = config.askingLanguage
    }

    public importLesson(list: WordPair[]): void {
        if (this.config.selectiveLessons) {
            list = list.filter((wordPair) =>
                this.config.selectiveLessons?.includes(wordPair.lesson)
            )
        }
        this.words.push(...list)
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

    private static compareWords(word1: string, word2: string): boolean {
        return (
            VocabularyTrainer.cleanWord(word1) ===
            VocabularyTrainer.cleanWord(word2)
        )
    }

    private findTranslation(word: string): WordPair | undefined {
        return this.words.find((wordPair) =>
            VocabularyTrainer.compareWords(wordPair[this.askingLanguage], word)
        )
    }

    public async testVocabulary(): Promise<boolean> {
        let result

        if (this.words.length === 0) {
            console.log('No words to test')
            return false
        }

        const { wordPair, index } = this.getRandomWordPair()
        console.log(`Translate: ${wordPair[this.getPromptLanguage()]}`)
        if (this.config.showHint)
            console.log(
                `Hint: This word is from Lesson ${wordPair.lesson}, ${wordPair.category}`
            )

        try {
            result = await this.prompt.get([this.askingLanguage])
        } catch (e) {
            process.exit()
        }

        const correct = VocabularyTrainer.compareWords(
            result[this.askingLanguage],
            wordPair[this.askingLanguage]
        )

        console.log(`You were ${correct ? 'correct ✅' : 'incorrect ❌'}!`)
        console.log(`The correct answer is: ${wordPair[this.askingLanguage]}`)
        if (!correct) {
            const translation = this.findTranslation(
                result[this.askingLanguage]
            )
            if (translation) {
                console.log(
                    `You answered: ${
                        result[this.askingLanguage]
                    }, which is the translation of: ${
                        translation[this.getPromptLanguage()]
                    }`
                )
            }
        }

        if (correct) this.words.splice(index, 1)
        return correct
    }

    public async runTrainer(): Promise<void> {
        let index = 1
        let correct = 0
        let incorrect = 0

        process.on('exit',  () => {
            const score = Math.round((correct / (correct + incorrect)) * 100)
            const sentiment = score >= 60 ? '🚀' : '🤯'

            console.log(
                `\n${sentiment} You got a score of ${score}% (${correct} correct and ${incorrect} incorrect answers, ${this.config.rounds} rounds)`
            )
        })

        while (index <= this.config.rounds || this.config.rounds === 0) {
            console.log(`\nRound ${index}${this.config.rounds > 0 ?  ' of ' + this.config.rounds : '' }`)
            ;(await this.testVocabulary()) ? correct++ : incorrect++
            index++
        }
    }
}
