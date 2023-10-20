/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-17 14:16:01
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-19 15:21:53
 * @FilePath: \gsap\components\SectionScreen.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { HtmlHTMLAttributes, forwardRef } from 'react'
const SectionScreen = forwardRef<
    HTMLDivElement,
    HtmlHTMLAttributes<HTMLDivElement>
>((props, ref) => {
    const { className, children } = props
    return (
        <div {...props} ref={ref} className={`relative h-screen  ${className}`}>
            {children}
        </div>
    )
})
export default SectionScreen
