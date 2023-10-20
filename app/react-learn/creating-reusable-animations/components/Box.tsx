import { HtmlHTMLAttributes, FC, useRef } from 'react'
const Box: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
}) => {
    const el = useRef<HTMLDivElement>(null)
    return (
        <div
            ref={el}
            className={`w-32 h-32 rounded-md m-4 flex justify-center items-center text-center text-white ${className}`}
        >
            {children}
        </div>
    )
}
export default Box
