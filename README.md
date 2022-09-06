# Vocabulary Trainer

## How to use

Install via `yarn install`. Then run `yarn build` to build the vocabulary trainer.
You can run it with `yarn start` or via the executable `./vocabulary`.

```shell
# Install dependencies
yarn install

# Build
yarn build

# Build and run
yarn dev

# Executable
./vocabulary
```

## Quick round of 3

You can play a quick round of 3 words with `./vocabulary --quick`.

## Config

The config file is located at `./config.ts`. It contains the following fields:
    
```typescript
type Config = {
    // Which language will be asked
    // Default: 'nl'
    askingLanguage: 'nl' | 'en'
    // How many words should be trained
    // Default: 10
    rounds: number
    // Show lesson and category
    // Default: true
    showHint: boolean
    // Only play certain lessons of 1-10
    // Default: [] (all lessons)
    selectiveLessons?: number[]
}

defaultConfig = {
    askingLanguage: 'nl',
    rounds: 10,
    showHint: true,
    // selectiveLessons: [1, 2, 3],
}

```
