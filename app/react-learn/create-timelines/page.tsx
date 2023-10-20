/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 09:37:36
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 16:58:56
 * @FilePath: \gsap\app\react-learn\create-timelines\page.tsx
 * @Description:到目前为止，我们只是使用 refs 来存储对 DOM 元素的引用，但它们不仅适用于元素。引用存在于渲染循环之外 - 因此它们可用于存储您希望在组件生命周期内保留的任何值。为了避免在每次渲染时都创建新的时间轴，请务必在效果中创建时间轴并将其存储在 ref 。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { HtmlHTMLAttributes, forwardRef, useRef, useState } from 'react'
import { gsap } from 'gsap-trial'
import { Button } from '@nextui-org/react'
const Box = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
    ({ children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={`w-48 h-48 m-6 rounded-md text-center flex justify-center items-center ${className}`}
            >
                {children}
            </div>
        )
    }
)
const Circle = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
    ({ children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={`w-48 h-48 m-6 rounded-full text-center flex justify-center items-center ${className} circle`}
            >
                {children}
            </div>
        )
    }
)
export default function CreateTimeline() {
    const el = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)
    const tl = useRef<GSAPTimeline>()
    const [reversed, setReversed] = useState<boolean>(false)
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            console.log('创建时间线')
            tl.current && tl.current.progress(0).kill()
            tl.current = gsap
                .timeline()
                .to(boxRef.current, {
                    rotation: 360,
                })
                .to('.circle', {
                    x: 100,
                })
        }, el)
        return () => ctx.revert()
    }, [])
    useIsomorphicLayoutEffect(() => {
        tl.current?.reversed(reversed)
    }, [reversed])
    return (
        <SectionScreen
            ref={el}
            className="flex flex-col justify-center items-center"
        >
            <div>
                <Button
                    color="primary"
                    className="mx-8"
                    onClick={() => {
                        tl.current?.reversed(!tl.current.reversed())
                    }}
                >
                    点击直接触发
                </Button>
                <Button
                    color="primary"
                    className="mx-8"
                    onClick={() => {
                        setReversed(!reversed)
                    }}
                >
                    通过修改变量触发
                </Button>
            </div>
            <Box ref={boxRef} className="bg-red-400">
                Ref时间线
            </Box>
            <Circle className="bg-green-400">类名时间线</Circle>
        </SectionScreen>
    )
}
