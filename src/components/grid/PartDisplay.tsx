import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

type Props = {
  value?: number
}

export const PartDisplay = ({ value }: Props) => {
  const { isDarkMode } = useContext(AppContext)

  const partSrc = isDarkMode
    ? `${process.env.PUBLIC_URL}/parts/${value}_d.png`
    : `${process.env.PUBLIC_URL}/parts/${value}.png`

  return (
    <div className="flex items-center justify-center">
      <img
        className="w-5 h-5"
        key={value}
        src={partSrc}
        alt={value?.toString()}
      />
    </div>
  )
}
