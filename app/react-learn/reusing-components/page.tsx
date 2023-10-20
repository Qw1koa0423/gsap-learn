/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-18 17:57:12
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 09:09:40
 * @FilePath: \gsap\app\reusing-components\page.tsx
 * @Description: 在基于组件的系统中，您可能需要对目标元素进行更精细的控制。您可以将 props 向下传递给子级，以调整类名或数据标识符并定位特定元素。React 建议纯粹使用样式和数据属性的类来针对 JS 功能（如动画）的元素。在这个例子中，我们将使用类，因为它们更好被理解。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'

import { HtmlHTMLAttributes, forwardRef, useRef, FC } from 'react'
import { gsap } from 'gsap-trial'
const Box: FC<HtmlHTMLAttributes<HTMLDivElement> & { anim?: string }> = ({
    children,
    className,
    anim,
}) => {
    return (
        <div
            className={`w-32 h-32 rounded-md ${className}`}
            data-animate={anim}
        >
            {children}
        </div>
    )
}
export default function ReusingComponent() {
    const el = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Target the two specific elements we have asigned the animate class
            gsap.to("[data-animate='rotate']", {
                rotation: 360,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true,
            })

            gsap.to("[data-animate='move']", {
                x: 100,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true,
            })

            gsap.set('.dont-animate', {
                backgroundColor: 'red',
            })
        }, el) // <- Scope!

        return () => ctx.revert()
    }, [])
    return (
        <SectionScreen
            ref={el}
            className="flex flex-col justify-around items-center"
        >
            <Box
                anim="rotate"
                className="bg-green-400 flex justify-center items-center"
            >
                旋转
            </Box>
            <Box className="dont-animate flex justify-center items-center">
                无动画
            </Box>
            <Box
                anim="move"
                className="bg-green-400 flex justify-center items-center"
            >
                移动
            </Box>
        </SectionScreen>
    )
}
