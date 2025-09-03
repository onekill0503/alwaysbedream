import { MotionDiv, MotionP } from './motion'
import { useEffect, useState } from 'react'

interface LoadingProps {
  onComplete: () => void
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 100)

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [onComplete])

  return (
    <MotionDiv
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold tracking-tight text-black mb-4">
            aji
          </h1>
          <p className="text-gray-600 text-lg">Full-Stack Developer</p>
        </MotionDiv>

        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <MotionDiv
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="bg-black h-full"
            />
          </div>
          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 mt-4"
          >
            Loading {Math.round(progress)}%
          </MotionP>
        </div>
      </div>
    </MotionDiv>
  )
}

export default Loading