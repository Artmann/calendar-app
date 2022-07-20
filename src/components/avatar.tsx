import { ReactElement } from 'react'

type AvatarProps = {
  alt: string
  data: string
}

export function Avatar({ alt, data }: AvatarProps): ReactElement {
  const src = `data:image/png;base64,${ data }`

  return (
    <img
      alt={ alt }
      className='h-6 w-6 rounded-full'
      src={ src }
    />
  )
}