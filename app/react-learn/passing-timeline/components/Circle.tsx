import { HtmlHTMLAttributes, FC, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/helpers'
const Circle: FC<
    HtmlHTMLAttributes<HTMLDivElement> & {
        index: number
        timeline: GSAPTimeline|undefined
    }
> = ({ children, className, index, timeline }) => {
    const el = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        timeline &&
            timeline.to(
                el.current,
                {
                    x: 100,
                    rotation: 360,
                },
                index * 0.1
            )
    }, [timeline, index])
    return (
        <div
            ref={el}
            className={`w-32 h-32 rounded-full flex justify-center items-center text-center text-white ${className}`}
        >
            {children}
        </div>
    )
}
export default Circle
