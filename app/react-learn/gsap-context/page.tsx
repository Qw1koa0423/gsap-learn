/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-18 17:15:23
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 15:52:37
 * @FilePath: \gsap\app\gsap-context\page.tsx
 * @Description:动画通常涉及针对许多 DOM 元素。如果我们想错开 10 个不同的元素，我们必须为每个 DOM 节点创建一个 Ref。这很快就会变得重复和混乱。那么，我们如何利用选择器文本的灵活性和 Refs 的安全性呢？使用 gsap.context（）。copntext 为 React 开发人员提供了两个非常有用的功能，一个是使用作用域选择器的选项，更关键的是动画清理。
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
            <div
                ref={ref}
                className={`w-48 h-48 m-6 rounded-md text-center flex justify-center items-center ${className}`}
            >
                {children}
            </div>
        )
    }
)
export default function GsapContext() {
    const el = useRef<HTMLDivElement>(null)
    const _boxRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // ps：这里需要注意.box 类名是属于el作用域范围内的
            gsap.to('.box', {
                rotation: 720,
                duration: 5,
                repeat: -1,
            })
            // ps：Ref不受el作用域影响
            gsap.to(boxRef.current, {
                x: 300,
                duration: 3,
                repeat: -1,
            })
            gsap.to(_boxRef.current, {
                x: 300,
                duration: 3,
                repeat: -1,
            })
        }, el)
        // gsap.context() 使清理变得漂亮而简单，在函数中创建的所有 GSAP 动画和滚动触发器都被收集起来，以便您可以轻松地 revert() 一次完成所有清理。
        return () => ctx.revert()
    }, [])
    return (
        <>
            <Box className="box bg-primary-400">
                我是类名控制的旋转位于el作用域外
            </Box>
            <Box className=" bg-orange-400" ref={_boxRef}>
                我是ref控制的移动位于el作用域外
            </Box>
            <SectionScreen
                ref={el}
                className="flex flex-col  items-center bg-slate-100"
            >
                <p>el作用域</p>
                <Box className="box bg-red-400">我是类名控制的旋转</Box>
                <Box className="bg-green-400" ref={boxRef}>
                    我是ref控制的移动
                </Box>
            </SectionScreen>
        </>
    )
}
