import useIsomorphicLayoutEffect from '@/helpers/isomorphicEffect'
import { RefObject, forwardRef, useRef, HtmlHTMLAttributes } from 'react'
import { gsap } from 'gsap-trial'
type GsapEffectProps = {
    effect: string
    targetRef: RefObject<HTMLElement>
    vars?: GSAPTweenVars
} & HtmlHTMLAttributes<HTMLSpanElement>
const GsapEffect = forwardRef<GSAPTween | undefined, GsapEffectProps>(
    ({ children, effect, targetRef, vars }, ref) => {
        const animation = useRef<GSAPTween>()
        const ctx = gsap.context(() => {})
        useIsomorphicLayoutEffect(() => {
            return () => ctx.revert()
        }, [])
        useIsomorphicLayoutEffect(() => {
            if (gsap.effects[effect]) {
                ctx.add(() => {
                    animation.current = gsap.effects[effect](
                        targetRef.current,
                        vars
                    )
                })
            }
        }, [ctx, effect, targetRef, vars])

        useIsomorphicLayoutEffect(() => {
            //  如果传递了ref，则转发动画实例
            if (typeof ref === 'function') {
                ref(animation.current)
            } else if (ref) {
                ref.current = animation.current
            }
        }, [ref])

        return <>{children}</>
    }
)
export default GsapEffect
