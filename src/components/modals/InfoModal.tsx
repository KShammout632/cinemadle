import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Inspired by Wordle, try to guess the movie in 6 tries. A new frame from
        the film will display after each incorrect guess.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell isCompleted={true} value="Incorrect guess" status="incorrect" />
      </div>
      <div className="flex justify-center mb-1 mt-4">
        <Cell isCompleted={true} value="Correct guess" status="correct" />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        If you enjoyed the app, feel free to check out my other
        <a
          className="text-sm text-blue-500 dark:text-white-300"
          href="https://kshammout.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          projects
        </a>{' '}
        or
        <a
          className="text-sm text-blue-500 dark:text-white-300"
          href="https://www.buymeacoffee.com/kshammout"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          buy me a coffee
        </a>
        !
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        Special thanks to Alec and Karim for the idea{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </p>
    </BaseModal>
  )
}
