/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 17:14:42
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 17:22:49
 * @FilePath: \gsap\components\Transition.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { useContext } from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap-trial'

import TransitionContext from './TransitionContext'

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
    const { toggleCompleted } = useContext(TransitionContext)
    const pathname = usePathname()
    return (
        <SwitchTransition>
            <Transition
                key={pathname}
                timeout={500}
                onEnter={(node: GSAPTweenTarget) => {
                    toggleCompleted(false)
                    gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 })
                    gsap.timeline({
                        paused: true,
                        onComplete: () => toggleCompleted(true),
                    })
                        .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
                        .to(node, { scale: 1, duration: 0.25 })
                        .play()
                }}
                onExit={(node) => {
                    gsap.timeline({ paused: true })
                        .to(node, { scale: 0.8, duration: 0.2 })
                        .to(node, {
                            xPercent: 100,
                            autoAlpha: 0,
                            duration: 0.2,
                        })
                        .play()
                }}
            >
                {children}
            </Transition>
        </SwitchTransition>
    )
}

export default TransitionComponent
