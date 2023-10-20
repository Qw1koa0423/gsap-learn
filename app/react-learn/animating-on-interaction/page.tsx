/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-18 16:18:07
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-18 17:07:14
 * @FilePath: \gsap\app\animating-on-interaction\page.tsx
 * @Description: 在交互上制作动画。我们可以挂接到回调以在某些事件（如点击或悬停）上触发动画。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
'use client'
import SectionScreen from '@/components/SectionScreen'
import { HtmlHTMLAttributes, FC } from 'react'
import { gsap } from 'gsap-trial'
const Box: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    onMouseEnter,
    onMouseLeave,
}) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`w-32 h-32 rounded-md ${className}`}
        >
            {children}
        </div>
    )
}
export default function AnimatingOnInteraction() {
    const onEnter = ({ currentTarget }: { currentTarget: GSAPTweenTarget }) => {
        gsap.to(currentTarget, {
            backgroundColor: '#e77614',
            scale: 1.25,
        })
    }
    const onLeave = ({ currentTarget }: { currentTarget: GSAPTweenTarget }) => {
        gsap.to(currentTarget, {
            backgroundColor: '#28a92b',
            scale: 1,
        })
    }
    return (
        <SectionScreen className="flex justify-center items-center">
            <Box
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="bg-red-500 flex justify-center items-center text-white"
            >
                鼠标移入
            </Box>
        </SectionScreen>
    )
}
