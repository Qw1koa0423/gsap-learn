/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-19 16:33:29
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:04:37
 * @FilePath: \gsap\app\register-effect\components\Box.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { HtmlHTMLAttributes, forwardRef } from 'react'

const Box = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
    ({ children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={`w-32 h-32 rounded-md flex justify-center items-center text-white ${className}`}
            >
                {children}
            </div>
        )
    }
)
export default Box
