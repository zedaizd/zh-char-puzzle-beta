type Props = {
  value?: number
}

export const PartDisplay = ({ value }: Props) => {
  const partSrc = `${process.env.PUBLIC_URL}/parts/${value}.jpg`
  return <div>
    <img key={value} src={partSrc} alt={value?.toString()}></img>
    </div>
}
