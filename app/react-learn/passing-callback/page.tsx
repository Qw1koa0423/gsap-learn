/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 13:20:35
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 13:44:05
 * @FilePath: \gsap\app\passing-callback\page.tsx
 * @Description:传递一个方法，子组件通过这个方法为父组件时间轴增加动画
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { useCallback, useState } from 'react'
import { gsap } from 'gsap-trial'
import { Button } from '@nextui-org/react'
import Box from './components/Box'
import Circle from './components/Circle'
export default function PassingCallback() {
    const [tl, setTl] = useState<GSAPTimeline>()
    useIsomorphicLayoutEffect(() => {
        console.log('创建时间轴')
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            setTl(tl)
        })
        return () => ctx.revert()
    }, [])
    const addAnimation = useCallback(
        (animation: gsap.core.TimelineChild, index: number) => {
            tl && tl.add(animation, index * 0.1)
        },
        [tl]
    )
    return (
        <SectionScreen className="flex flex-col justify-around items-center">
            <Button
                color="primary"
                onClick={() => {
                    tl && tl.reversed(!tl.reversed())
                }}
            >
                切换
            </Button>
            <Box addAnimation={addAnimation} index={0} className=" bg-red-400">
                Box
            </Box>
            <Circle
                addAnimation={addAnimation}
                index={1}
                className=" bg-green-400"
            >
                Circle
            </Circle>
        </SectionScreen>
    )
}
