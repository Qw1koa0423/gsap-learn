/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 15:35:50
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 16:18:58
 * @FilePath: \gsap\app\creating-reusable-animations\page.tsx
 * @Description:创建可重用的动画是保持代码整洁，同时减小应用文件大小的好方法。最简单的方法是调用函数来创建动画。对于更具声明性的方法，可以创建一个组件来处理动画。如果你想使用 React 片段或对函数组件进行动画处理，你应该为目标传递一个 ref。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { Button } from '@nextui-org/react'
import { useRef } from 'react'
import FadeIn from './components/FadeIn'
import Box from './components/Box'

export default function CreatingReusableAnimations() {
    const animation = useRef<GSAPTween>()
    const toggle = () => {
        animation.current &&
            animation.current.reversed(!animation.current.reversed())
    }
    return (
        <SectionScreen className="flex flex-col justify-around items-center">
            <Button color="primary" onClick={toggle}>
                切换
            </Button>
            <FadeIn
                ref={animation}
                vars={{
                    x: 300,
                    opacity: 0,
                    stagger: 0.5,
                    duration: 1,
                }}
            >
                <Box className="bg-green-400">Box 1</Box>
                <Box className="bg-green-400">Box 2</Box>
                <Box className="bg-green-400">Box 3</Box>
            </FadeIn>
        </SectionScreen>
    )
}
