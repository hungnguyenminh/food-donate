interface IProps {
  height?: string | number;
  width?: string | number;
  fill?: string;
}

export default function ICGoogle(props: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0"
      y="0"
      viewBox="0 0 210 210"
      xmlSpace="preserve"
      className=""
      width={props.width ?? 25}
      height={props.height ?? 25}
    >
      <g>
        <path
          d="M0 105C0 47.103 47.103 0 105 0c23.383 0 45.515 7.523 64.004 21.756l-24.4 31.696C133.172 44.652 119.477 40 105 40c-35.841 0-65 29.159-65 65s29.159 65 65 65c28.867 0 53.398-18.913 61.852-45H105V85h105v20c0 57.897-47.103 105-105 105S0 162.897 0 105z"
          fill={props.fill ?? 'black'}
          opacity="1"
          data-original="#000000"
        />
      </g>
    </svg>
  );
}
