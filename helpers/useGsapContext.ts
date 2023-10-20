/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 13:21:19
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:34:24
 * @FilePath: \gsap\helpers\useGsapContext.ts
 * @Description:记忆 GSAP 上下文实例。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { useMemo } from 'react'
import { gsap } from 'gsap-trial'
function useGsapContext(scope?: string | object | Element | undefined) {
    const ctx = useMemo(() => gsap.context(() => {}, scope), [scope])
    return ctx
}
export default useGsapContext
