import { MAX_CHALLENGES } from '../../constants/settings'
import { isWinningWord } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guesses: string[]
}

export const Grid = ({ guesses }: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES
      ? Array.from(Array(MAX_CHALLENGES - guesses.length))
      : []

  return (
    <>
      <div>
        {guesses.map((guess, index) => (
          <Cell
            key={index}
            value={guess}
            status={isWinningWord(guess) ? 'correct' : 'incorrect'}
            isCompleted
          />
        ))}
      </div>
      {empties.map((_, i) => (
        <Cell key={i} />
      ))}
    </>
  )
}
