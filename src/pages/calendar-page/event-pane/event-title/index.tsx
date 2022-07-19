import { FormEvent, ReactElement } from 'react'

type EventTitleProps = {
  title: string
  
  onTitleChange: (title: string) => void
}

export function EventTitle({ title, onTitleChange }: EventTitleProps): ReactElement {
  const onChangeHandler = (event: FormEvent<HTMLInputElement>): void => {
    onTitleChange(event.currentTarget.value)
  }

  return (
    <input
      autoFocus={ true }
      className={`
        bg-red-100
        h-8 w-full
        mb-2 pb-2
        outline-none
        text-black font-bold text-black leading-6 text-xl
      `}
      placeholder='Event name'
      onChange={ onChangeHandler }
      value={ title }
    />
  )
}