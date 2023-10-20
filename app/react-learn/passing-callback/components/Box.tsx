'use client'
import { gsap } from 'gsap-trial'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { HtmlHTMLAttributes, FC, useRef } from 'react'
const Box: FC<
    HtmlHTMLAttributes<HTMLDivElement> & {
        index: number
        addAnimation: (
            animation: gsap.core.TimelineChild,
            index: number
        ) => void
    }
> = ({ children, className, index, addAnimation }) => {
    const el = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        console.log('Box effect')
        const ctx = gsap.context(() => {
            const animation = gsap.to(el.current, { x: -100 })
            addAnimation(animation, index)
        })
        return () => ctx.revert()
    }, [addAnimation, index])
    return (
        <div
            ref={el}
            className={`w-32 h-32 rounded-md flex justify-center items-center text-center text-white ${className}`}
        >
            {children}
        </div>
    )
}
export default Box
