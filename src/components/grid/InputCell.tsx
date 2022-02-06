import classnames from 'classnames'
import React from 'react'

type Props = {
  onChar: (value: string) => void
  onEnter: () => void
  value?: string
}

export const InputCell = ({ onChar, onEnter, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChar(event.target.value)
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onEnter()
  }

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600',
    {
      'border-black dark:border-slate-100': value,
      'cell-animation': !!value,
    }
  )

  const buttonClassName =
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400'

  return (
    <div className="flex justify-center mb-1">
      <input
        className={classes}
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="猜一字"
      />
      <button className={buttonClassName} onClick={handleClick}>
        確認
      </button>
    </div>
  )
}
