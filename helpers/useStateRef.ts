/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 13:34:55
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 13:48:47
 * @FilePath: \gsap\helpers\useStateRef.ts
 * @Description: 此钩子有助于解决在回调中访问过时值的问题。它的工作方式与 useState 完全相同，但返回第三个值，即具有当前状态的 ref。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { useState, useRef, useCallback } from 'react'
function useStateRef(defaultValue: any) {
    const [state, setState] = useState(defaultValue)
    const ref = useRef(state)

    const dispatch = useCallback((value: any) => {
        console.log('dispatch', value)
        ref.current = typeof value === 'function' ? value(ref.current) : value
        setState(ref.current)
    }, [])

    return [state, dispatch, ref]
}
export default useStateRef
