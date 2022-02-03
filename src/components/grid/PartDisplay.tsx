type Props = {
  value?: number
}

export const PartDisplay = ({ value }: Props) => {
  const partSrc = `${process.env.PUBLIC_URL}/parts/${value}.png`
  return <div className="flex items-center justify-center">
      <img className="w-5 h-5" key={value} src={partSrc} alt={value?.toString()}></img>
    </div>
}
