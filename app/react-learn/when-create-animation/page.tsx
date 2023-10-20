/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 10:01:07
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 13:02:44
 * @FilePath: \gsap\app\when-create-animation\page.tsx
 * @Description:如果我们不将依赖数组传递给 useLayoutEffect() ，则会在第一次渲染后和每次更新后调用它。因此，每次组件的状态更改时，都会导致重新渲染，这将再次运行我们的效果。通常，这是浪费，并可能产生冲突。我们可以通过传入依赖项数组来控制何时 useLayoutEffect 应该运行。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { useIsomorphicLayoutEffect } from '@/helpers'

import { HtmlHTMLAttributes, useRef, FC, useState } from 'react'
import { gsap } from 'gsap-trial'
import { Button } from '@nextui-org/react'
const Box: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`w-32 h-32 rounded-md flex justify-center items-center text-center text-white ${className}`}
        >
            {children}
        </div>
    )
}
export default function WhenCreateAnimation() {
    const el = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState<number>(0)
    const [delayCount, setDelayCount] = useState<number>(0)
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.box-1', {
                rotation: 360,
            })
        }, el)
        return () => ctx.revert()
    })
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.box-2', {
                rotation: 360,
            })
        }, el)
        return () => ctx.revert()
    }, [])
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.box-3', {
                rotation: 360,
            })
        }, el)
        return () => ctx.revert()
    }, [delayCount])
    useIsomorphicLayoutEffect(() => {
        const timer = setTimeout(() => {
            setDelayCount(count)
        }, 1000)
        return () => clearTimeout(timer)
    }, [count])
    return (
        <SectionScreen
            ref={el}
            className="flex flex-col justify-center items-center"
        >
            <Button
                color="primary"
                onClick={() => {
                    setCount(count + 1)
                }}
            >
                单击触发渲染
            </Button>
            <div className="my-4 text-center">
                <p>单击次数:{count}</p>
                <p>依赖修改的值：{delayCount}</p>
                <p>渲染次数:{1 + count + delayCount}</p>
            </div>
            <div className="flex">
                <Box className=" bg-red-400 box-1">每次渲染都执行</Box>
                <Box className=" bg-orange-400 box-2 mx-4">第一次渲染执行</Box>
                <Box className=" bg-green-400 box-3">
                    第一次渲染或者每次修改依赖值执行
                </Box>
            </div>
        </SectionScreen>
    )
}
