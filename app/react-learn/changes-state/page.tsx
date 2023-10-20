/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 10:19:54
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 16:49:25
 * @FilePath: \gsap\app\react-learn\changes-state\page.tsx
 * @Description:现在我们知道了如何控制效果何时触发，我们可以使用此模式来响应组件中的更改。这在传递道具时特别有用。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'

import { HtmlHTMLAttributes, useRef, FC, useState } from 'react'
import { gsap } from 'gsap-trial'
import { Button } from '@nextui-org/react'
const randomX = gsap.utils.random(-200, 200, 1, true)
const Box: FC<HtmlHTMLAttributes<HTMLDivElement> & { endX?: number }> = ({
    children,
    className,
    endX,
}) => {
    const boxRef = useRef<HTMLDivElement>(null)
    const ctx = useRef<gsap.Context>()
    useIsomorphicLayoutEffect(() => {
        ctx.current = gsap.context(() => {})
        return () => ctx.current?.revert()
    }, [ctx])
    useIsomorphicLayoutEffect(() => {
        ctx.current?.add(() => {
            gsap.to(boxRef.current, {
                x: endX,
            })
        })
    }, [endX])
    return (
        <div
            ref={boxRef}
            className={`w-32 h-32 rounded-md flex justify-center items-center text-center text-white ${className}`}
        >
            {children}
        </div>
    )
}
export default function ChangesState() {
    const [endX, setEndX] = useState<number>(0)
    return (
        <SectionScreen className="flex flex-col justify-around items-center">
            <Button color="primary" onClick={() => setEndX(randomX())}>
                传递一个随机值
            </Button>
            <Box className="bg-green-400" endX={endX}>
                {endX}
            </Box>
        </SectionScreen>
    )
}
