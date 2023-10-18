import astronautTransparent from '@renderer/assets/astronaut-transparent.gif'

interface Props {
  text?: string
}

const Loading = ({ text }: Props): JSX.Element => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img
        src={astronautTransparent}
        alt="Loading animation"
        className="max-w-[450px] max-h-[450px]"
      />
      <h1>{text}</h1>
    </div>
  )
}

export default Loading
