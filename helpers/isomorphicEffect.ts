/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-16 13:34:40
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-18 16:19:53
 * @FilePath: \gsap\helpers\isomorphicEffect.ts
 * @Description: 如果将服务器端呈现 （SSR） 与 useLayoutEffect 配合使用，则可能会看到警告。您可以通过在服务器渲染期间有条件地使用 useEffect 来解决此问题。当代码在浏览器中运行时，此钩子将返回 useLayoutEffect，并在服务器上返回 useEffect。
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import { useEffect, useLayoutEffect } from 'react'

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
