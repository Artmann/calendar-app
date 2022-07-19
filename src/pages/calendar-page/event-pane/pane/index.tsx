import { ReactElement } from 'react'

type PaneProps = {
  children: ReactElement | ReactElement[] | string | number
  
  testId?: string
}

export function Pane({ children, testId }: PaneProps): ReactElement {
  return (
    <div
      className={`
        bg-white
        relative
        shadow
        w-80 h-full
      `}
      data-testid={ testId }
    >
      <div className='px-4 py-6'>
        { children}
      </div>
    </div>
  )
}