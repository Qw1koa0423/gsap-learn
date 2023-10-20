/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 14:35:18
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 15:33:23
 * @FilePath: \gsap\app\imperative-communication\page.tsx
 * @Description:在大多数情况下，传递道具或使用上下文效果很好，但使用这些机制会导致重新渲染，如果您不断更改值（例如基于鼠标位置的值），这可能会损害性能。为了绕过 React 的渲染阶段，我们可以使用 useImperativeHandle 钩子，并为我们的组件创建一个 API。无论命令式钩子返回什么值，都将作为引用转发
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { gsap } from 'gsap-trial'
import {
    forwardRef,
    useRef,
    HtmlHTMLAttributes,
    useImperativeHandle,
} from 'react'
type CircleProps = {
    delay: number
} & HtmlHTMLAttributes<HTMLDivElement>
type CircleHandleProps = {
    moveTo: (x: number, y: number) => void
}
// @ts-ignore
gsap.config({ trialWarn: false })
const Circle = forwardRef<CircleHandleProps, CircleProps>(
    ({ delay, className, children }, ref) => {
        const el = useRef<HTMLDivElement>(null)
        useImperativeHandle(
            ref,
            () => {
                return {
                    // 暴露出moveTo方法
                    moveTo(x: gsap.TweenValue, y: gsap.TweenValue) {
                        gsap.to(el.current, {
                            x,
                            y,
                            delay,
                        })
                    },
                }
            },
            [delay]
        )
        return (
            <div
                ref={el}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-30 rounded-full  ${className}`}
            >
                {children}
            </div>
        )
    }
)
export default function ImperativeCommunication() {
    const circleRefs = useRef<CircleHandleProps[]>([])
    const onMove = ({
        clientX,
        clientY,
    }: {
        clientX: number
        clientY: number
    }) => {
        circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY))
    }
    useIsomorphicLayoutEffect(() => {
        const { innerWidth, innerHeight } = window
        circleRefs.current.forEach((ref) => {
            ref.moveTo(innerWidth / 2, innerHeight / 2)
        })
        // 检测鼠标移动事件
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
    }, [])
    const addCircleRef = (ref: CircleHandleProps) => {
        // 这里的ref和Circle的ref是一样的
        if (ref) {
            circleRefs.current.push(ref)
        }
    }
    return (
        <SectionScreen className="flex flex-col justify-around items-center">
            <p>移动鼠标</p>
            <Circle
                delay={0}
                ref={addCircleRef}
                className="bg-green-800 w-8 h-8"
            />
            <Circle
                delay={0.1}
                ref={addCircleRef}
                className="bg-green-800 w-10 h-10"
            />
            <Circle
                delay={0.2}
                ref={addCircleRef}
                className="bg-green-800  w-12 h-12"
            />
        </SectionScreen>
    )
}
