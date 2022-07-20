import { FormEvent, ReactElement } from 'react'

type EventTitleProps = {
  title: string
  
  onSubmit: () => void
  onTitleChange: (title: string) => void
}

export function EventTitle({ title, onTitleChange, onSubmit }: EventTitleProps): ReactElement {
  const onChangeHandler = (event: FormEvent<HTMLInputElement>): void => {
    onTitleChange(event.currentTarget.value)
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    onSubmit()
  }

  return (
    <form
      className='w-full'
      onSubmit={ onSubmitHandler }
    >
      <input
        autoFocus={ true }
        className={`
          h-8 w-full
          mb-2 pb-2
          outline-none
          placeholder-grayscale-400
          text-black font-bold
          event-title-input
        `}
        data-testid='event-title'
        placeholder='Event name'
        onChange={ onChangeHandler }
        value={ title }
      />
    </form>
  )
}