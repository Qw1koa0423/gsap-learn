/*
 * @Author: 刘浩奇 liuhaoqi@yaozai.net
 * @Date: 2023-10-20 14:05:45
 * @LastEditors: 刘浩奇 liuhaoqi@yaozai.net
 * @LastEditTime: 2023-10-20 17:24:49
 * @FilePath: \gsap\components\ListCard.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 遥在科技, All Rights Reserved.
 */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
} from '@nextui-org/react'
import NextLink from 'next/link'
type ListCardProps = {
    title: string
    subtitle?: string
    desc: string
    path: string
}
const ListCard = ({ title, subtitle, desc, path }: ListCardProps) => {
    return (
        <Card className="w-96  m-4" isHoverable isBlurred isPressable>
            <CardHeader className="flex gap-3">
                <Image
                    alt="gsap start"
                    height={52}
                    radius="sm"
                    src="https://camo.githubusercontent.com/e14792301106c149997ee7da88c9c935b67cf1b6642be6a2266fe11ba439b5ea/687474703a2f2f677265656e736f636b2e636f6d2f5f696d672f6769746875622f7468756d622d67657474696e672d737461727465642d736d616c6c2e676966"
                    width={96}
                />
                <div className="flex flex-col truncate items-start">
                    <p className="text-md">{title}</p>
                    <Link
                        className="text-small text-default-500 "
                        isExternal
                        href={'https://' + subtitle}
                    >
                        {subtitle}
                    </Link>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{desc}</p>
            </CardBody>
            <Divider />
            <CardFooter className=" flex  flex-row-reverse">
                <Link showAnchorIcon href={path} as={NextLink}>
                    查看详情
                </Link>
            </CardFooter>
        </Card>
    )
}
export default ListCard
