'use client'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { gsap } from 'gsap-trial'
import { forwardRef, useRef, HtmlHTMLAttributes } from 'react'
type FadeInProps = {
    vars:GSAPTweenVars
} & HtmlHTMLAttributes<HTMLSpanElement>

const FadeIn = forwardRef<GSAPTween | undefined, FadeInProps>(
    ({children,vars}, ref) => {
        const el = useRef<HTMLSpanElement>(null)
        const animation = useRef<GSAPTween>()
        useIsomorphicLayoutEffect(() => {
            const ctx = gsap.context(() => {
                if (el.current) {
                    animation.current = gsap.from(el.current.children,vars)
                }
            })
            return () => ctx.revert()
        }, [])

        useIsomorphicLayoutEffect(() => {
            // 转发动画实例
            if (typeof ref === 'function') {
                animation.current && ref(animation.current)
            } else if (ref) {
                ref.current = animation.current
            }
        }, [ref])

        return <span ref={el}>{children}</span>
    }
)
export default FadeIn
