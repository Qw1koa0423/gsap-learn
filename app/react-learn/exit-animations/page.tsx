/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 16:55:57
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 09:07:33
 * @FilePath: \gsap\app\exit-animations\page.tsx
 * @Description:要对退出 DOM 的元素进行动画处理，我们需要延迟 React 删除元素的时间。我们可以通过在动画完成后更改组件的状态来做到这一点。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import { gsap } from 'gsap-trial'
import { useRef, useState } from 'react'
import SectionScreen from '@/components/SectionScreen'
import { Button } from '@nextui-org/react'
import { useIsomorphicLayoutEffect } from '@/helpers'
export default function ExitAnimations() {
    const app = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(true)
    const boxRef = useRef<HTMLDivElement>(null)
    const [ctx] = useState<gsap.Context>(gsap.context(() => {}, app))
    useIsomorphicLayoutEffect(() => {
        ctx.add('remove', () => {
            gsap.to(ctx.selector?.('.box'), {
                opacity: 0,
                onComplete: () => setActive(false),
            })
        })
        return () => ctx.revert()
    }, [])
    return (
        <SectionScreen
            className="flex flex-col justify-center items-center"
            ref={app}
        >
            <Button
                color="primary"
                className="my-8"
                onClick={() => {
                    active && ctx.remove()
                }}
            >
                {active ? '删除盒子' : '已删除'}
            </Button>
            {active ? (
                <div
                    ref={boxRef}
                    className="w-32 h-32 rounded-md text-white bg-green-400 flex justify-center items-center text-center box"
                >
                    Box
                </div>
            ) : null}
        </SectionScreen>
    )
}
