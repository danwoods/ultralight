import { inSecure } from '../../../util/ids'

type Props = {
  value: string | null | undefined
  onChange: (arg0: string) => any
  label: string
  id?: string
  type?: 'text' | 'password' | 'email'
  classes?: {
    input?: string
    label?: string
  }
}

export const TextInput = ({
  value,
  onChange,
  label,
  id = `textInput-${inSecure()}`,
  type = 'text',
  classes = {}
}: Props) => {
  return (
    <>
      <label htmlFor={id} className={'ml-9 text-base ' + classes.label}>
        {label}
      </label>
      <input
        id={id}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={'m-8 mt-1 p-5'}
        type={type}
      />
    </>
  )
}

export default TextInput
