/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-18 16:52:03
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 09:15:49
 * @FilePath: \gsap\app\triggering-and-ref\page.tsx
 * @Description: useIsomorphicLayoutEffect在 React 执行完所有 DOM 突变后立即运行。这是一个非常方便的动画钩子，因为它可以确保您的元素已呈现并准备好进行动画处理。为了制作动画，我们需要告诉 GSAP 我们要定位哪些元素。访问 DOM 节点的 React 方法是使用 Ref
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { HtmlHTMLAttributes, forwardRef, useRef } from 'react'
import { gsap } from 'gsap-trial'

const Box = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
    ({ children, className }, ref) => {
        return (
            <div ref={ref} className={`w-32 h-32 rounded-md ${className}`}>
                {children}
            </div>
        )
    }
)
export default function TriggeringAndRef() {
    const boxRef = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        gsap.to(boxRef.current, {
            rotation: 720,
            duration: 3,
            repeat: -1,
        })
    }, [])
    return (
        <SectionScreen className="flex justify-center items-center">
            <Box
                ref={boxRef}
                className="bg-red-500 flex justify-center items-center text-white"
            >
                进入旋转
            </Box>
        </SectionScreen>
    )
}
