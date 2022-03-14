import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { useEffect, useRef } from 'react'
import { MAX_CHALLENGES } from '../../constants/settings'
type Props = {
  title: string
  numGuesses: number
  isFinished: boolean
}

export const FrameContainer = ({ title, numGuesses, isFinished }: Props) => {
  const slideRef = useRef()

  useEffect(() => {
    if (slideRef.current && !isFinished) {
      // @ts-ignore
      slideRef.current.goTo(Math.min(numGuesses, MAX_CHALLENGES - 1))
    }
  }, [numGuesses, isFinished])

  const frames: string[] = []
  for (let i = 0; i <= Math.min(numGuesses, MAX_CHALLENGES - 1); i++) {
    frames.push(`film-frames/${title}/${i}.jpg`)
  }

  if (isFinished) {
    frames.length = 0
    for (let i = 0; i <= MAX_CHALLENGES - 1; i++) {
      frames.push(`film-frames/${title}/${i}.jpg`)
    }
  }
  return (
    <>
      <div className="slide-container mb-1">
        <Slide ref={slideRef} infinite={false} autoplay={false}>
          {frames.map((frame, index) => (
            <div
              className="each-slide flex justify-center items-center"
              key={index}
            >
              <img src={frame} alt="film-frame" />
              <div style={{ backgroundImage: `url(${frame})` }}></div>
            </div>
          ))}
        </Slide>
      </div>
      {/* <div>
        <img
          src={require(`../../film-frames/${title}/${2}.jpg`)}
          alt="film-frame"
        />
      </div>
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button> */}
    </>
  )
}
