import { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { ALL_FILMS } from '../../constants/filmlist'
import { cleanWord } from '../../lib/words'

type Props = {
  darkMode?: boolean
  onEnter: () => void
  currentGuess: string
  setCurrentGuess: (guess: string) => void
}

export const FilmInput = ({
  darkMode = false,
  onEnter,
  currentGuess,
  setCurrentGuess,
}: Props) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getSuggestions = (value: string) => {
    const inputValue = cleanWord(value)
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : ALL_FILMS.filter(
          (film) => cleanWord(film).slice(0, inputLength) === inputValue
        ).sort()
  }

  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value))
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const onSkip = () => {
    setCurrentGuess('')
    onEnter()
  }

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion: string) => suggestion}
        renderSuggestion={(suggestion: string) => (
          <div className="border-2 dark:bg-slate-800 dark:text-slate-100">
            {suggestion}
          </div>
        )}
        containerProps={{
          className: 'border-2 relative',
        }}
        inputProps={{
          className: 'w-full h-8 dark:bg-slate-800 dark:text-slate-100',
          value: currentGuess,
          onChange: (_e: any, { newValue }: any) => setCurrentGuess(newValue),
          autoFocus: true,
        }}
        renderSuggestionsContainer={({ containerProps, children }: any) => (
          <div
            {...containerProps}
            className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2 max-h-52 overflow-auto`}
          >
            {children}
          </div>
        )}
      />
      <div className="flex flex-row w-full">
        <button
          className="flex items-center justify-center w-1/2 border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          onClick={onSkip}
        >
          <span className={`ml-1 ${darkMode ? 'text-white' : 'text-black'}`}>
            {'Skip'}
          </span>
        </button>
        <button
          className="flex items-center justify-center w-1/2 border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          onClick={onEnter}
        >
          <span className={`ml-1 ${darkMode ? 'text-white' : 'text-black'}`}>
            {'Guess'}
          </span>
        </button>
      </div>
    </>
  )
}
