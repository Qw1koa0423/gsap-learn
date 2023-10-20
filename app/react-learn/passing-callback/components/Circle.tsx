/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 13:21:14
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 13:42:17
 * @FilePath: \gsap\app\passing-callback\components\Circle.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import { HtmlHTMLAttributes, FC, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { gsap } from 'gsap-trial'

const Circle: FC<
    HtmlHTMLAttributes<HTMLDivElement> & {
        index: number
        addAnimation: (
            animation: gsap.core.TimelineChild,
            index: number
        ) => void
    }
> = ({ children, className, index, addAnimation }) => {
    const el = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        console.log('Circle effect')
        const ctx = gsap.context(() => {
            const animation = gsap.to(el.current, { rotate: 360, x: 100 })
            addAnimation(animation, index)
        })

        return () => ctx.revert()
    }, [addAnimation, index])
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
