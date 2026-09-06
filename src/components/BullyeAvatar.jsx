/* Bullyee's face. */
import bullyeImg from '../assets/bullye.png'

export default function BullyeAvatar({ size = 40 }) {
  return (
    <img
      src={bullyeImg}
      alt="Bullyee"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center 30%',
        flex: 'none',
        background: 'var(--sq-orange-100)',
        display: 'block',
      }}
    />
  )
}
