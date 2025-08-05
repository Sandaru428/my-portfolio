import { FaLocationArrow } from 'react-icons/fa'
import { DotBackground } from './ui/DotBackground'
import MagicButton from './ui/MagicButton'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/text-generate-effect'

const Hero = () => {
  return (
    <div className='w-screen h-[85vh] relative overflow-hidden'>
      <div>
        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
      </div>

      <div className='flex justify-center relative my-20 z-10'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center my-20'>
          <h1 className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>welcome to my portfolio</h1>
          <TextGenerateEffect
            className='text-center text-blue-100 text-[40px] md:text-5xl lg:text-6xl'
            words='Transforming Concepts into Seamless User Experiences with AI'
          />
          <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
            Hi, I&apos;m Sandaruwan, a Next.js Developer based in Sri Lanka
          </p>

          <a href='#about'>
            <MagicButton
              title='Explore My Work'
              icon={<FaLocationArrow />}
              position='right'
            />
          </a>
        </div>
      </div>

      <DotBackground />

    </div>
  )
}

export default Hero
