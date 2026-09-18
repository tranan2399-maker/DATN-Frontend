const languageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"
      />
      <path
        d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}
const rateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
      viewBox="0 0 512 512"
    >
      <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
    </svg>
  )
}
const dateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
      viewBox="0 0 512 512"
    >
      <rect
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
      />
      <circle cx="296" cy="232" r="24" />
      <circle cx="376" cy="232" r="24" />
      <circle cx="296" cy="312" r="24" />
      <circle cx="376" cy="312" r="24" />
      <circle cx="136" cy="312" r="24" />
      <circle cx="216" cy="312" r="24" />
      <circle cx="136" cy="392" r="24" />
      <circle cx="216" cy="392" r="24" />
      <circle cx="296" cy="392" r="24" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        strokeLinecap="round"
        d="M128 48v32M384 48v32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M464 160H48"
      />
    </svg>
  )
}
const durationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="movie-info-icon text-primary-movieColor fill-primary-movieColor"
      viewBox="0 0 512 512"
    >
      <path
        d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256 128v144h96"
      />
    </svg>
  )
}
const iconMovieDetail = {
  languageIcon,
  durationIcon,
  rateIcon,
  dateIcon
}
export default iconMovieDetail
