import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="關於" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an open source word guessing game -{' '}
        <a
          href="https://github.com/zedaizd/zh-char-puzzle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
        <br />
        <br />
        這個專案是從
        <a
          href="https://github.com/hannahcode/word-guessing-game"
          className="underline font-fold"
        >
          hannahcode/word-guessing-game
        </a>{' '}
        分支出來的
      </p>
    </BaseModal>
  )
}
