/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-16 13:35:57
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 17:04:18
 * @FilePath: \gsap\components\Provider.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { NextUIProvider } from '@nextui-org/react'
import gsap from 'gsap-trial'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'
import { useRef } from 'react'
import { TransitionProvider } from './TransitionContext'
import TransitionComponent from './Transition'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
export function NextProvider({ children }: { children: React.ReactNode }) {
    const main = useRef<HTMLDivElement>(null)
    useIsomorphicLayoutEffect(() => {
        console.log(ScrollSmoother)
        const ctx = gsap.context(() => {
            ScrollSmoother.create({
                content: main.current,
                smooth: 1,
                effects: true,
            })
        }, main)
        return () => ctx.revert()
    }, [])
    return (
        <div ref={main}>
            <TransitionProvider>
                <TransitionComponent>
                    <NextUIProvider>{children}</NextUIProvider>
                </TransitionComponent>
            </TransitionProvider>
        </div>
    )
}
