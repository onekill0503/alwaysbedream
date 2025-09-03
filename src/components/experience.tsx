import { motion } from 'framer-motion'
import { ArcTimeline } from './magicui/arc-timeline'
import React from 'react'

interface ExperienceStep {
  icon: React.ReactNode
  content: string
}

interface ExperienceData {
  time: string
  steps: ExperienceStep[]
}

const Experience: React.FC = () => {
  const experienceData: ExperienceData[] = [
    {
      time: "2024 Q4",
      steps: [
        {
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
            </svg>
          ),
          content: "Launched blockchain platform with 10K+ users."
        }
      ]
    },
    {
      time: "2024 Q2",
      steps: [
        {
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          ),
          content: "Expanded to international markets."
        }
      ]
    },
    {
      time: "2023 Q4",
      steps: [
        {
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          ),
          content: "Architected scalable React applications."
        }
      ]
    },
    {
      time: "2023 Q2",
      steps: [
        {
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M7 15h0m5 0h0m5 0h0M7 11h0m5 0h0m5 0h0"/>
            </svg>
          ),
          content: "Mobile-first development approach."
        }
      ]
    },
    {
      time: "2022 Q4",
      steps: [
        {
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12l2 2 4-4"/>
            </svg>
          ),
          content: "Started full-stack development journey."
        }
      ]
    }
  ]

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 sm:mb-6">
            Experience
            <br />
            <span className="text-gray-400">Journey</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A timeline of my professional growth, showcasing key milestones and 
            technological expertise gained over the years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
          style={{
            '--step-line-active-color': '#000000',
            '--step-line-inactive-color': '#888888',
            '--icon-active-color': '#000000',
            '--icon-inactive-color': '#888888',
            '--description-color': '#374151',
            '--time-active-color': '#000000',
            '--time-inactive-color': '#6B7280',
            '--placeholder-line-color': '#D1D5DB'
          } as React.CSSProperties}
        >
          <ArcTimeline 
            data={experienceData}
            arcConfig={{
              circleWidth: 4500,
              angleBetweenMinorSteps: 0.4,
              lineCountFillBetweenSteps: 8,
              boundaryPlaceholderLinesCount: 50
            }}
            defaultActiveStep={{
              time: "2024 Q4",
              stepIndex: 0
            }}
            className="w-full"
          />
        </motion.div>

      </div>
    </section>
  )
}

export default Experience