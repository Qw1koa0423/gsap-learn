'use client'
import { gsap } from 'gsap-trial'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { HtmlHTMLAttributes, FC, useRef, useContext } from 'react'
import { SelectedContext } from '../page'
const Box: FC<
    HtmlHTMLAttributes<HTMLDivElement> & {
        id: string | number
    }
> = ({ children, className, id }) => {
    const el = useRef<HTMLDivElement>(null)
    const { selected } = useContext(SelectedContext)
    const ctx = gsap.context(() => {})
    useIsomorphicLayoutEffect(() => {
        return () => ctx.revert()
    }, [])
    useIsomorphicLayoutEffect(() => {
        // ctx始终改变  一直增加的
        ctx.add(() => {
            gsap.to(el.current, {
                x: selected === id ? 200 : 0,
            })
        })
    }, [selected, id, ctx])
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
