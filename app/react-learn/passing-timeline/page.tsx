/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 10:48:29
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 13:46:21
 * @FilePath: \gsap\app\passing-timeline\page.tsx
 * @Description: 传递时间轴,子组件直接调用时间轴进行动画
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'
import { useState } from 'react'
import { gsap } from 'gsap-trial'
import { Button } from '@nextui-org/react'
import Box from './components/Box'
import Circle from './components/Circle'
export default function PassingTimeline() {
    const [tl, setTl] = useState<GSAPTimeline>()
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            setTl(tl)
        })
        return () => ctx.revert()
    }, [])
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
            <Box timeline={tl} index={0} className=" bg-red-400">
                Box
            </Box>
            <Circle timeline={tl} index={1} className=" bg-green-400">
                Circle
            </Circle>
        </SectionScreen>
    )
}
