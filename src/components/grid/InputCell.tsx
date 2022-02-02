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
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'border-black dark:border-slate-100': value,
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>
          <input type="text" onChange={handleChange} value={value} placeholder='請輸入一個字...'/>
          <button onClick={handleClick}>確認</button>
        </div>
}
