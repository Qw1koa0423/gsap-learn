/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 13:04:41
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:33:27
 * @FilePath: \gsap\app\custom-hooks\components\Box.tsx
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
                className={`w-36 h-36 text-center rounded-md flex justify-center items-center text-white ${className}`}
            >
                {children}
            </div>
        )
    }
)
export default Box
