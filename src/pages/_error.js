import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

export default function ResolveRoute() {
    const router = useRouter()

    useEffect(() => {
        const pathname = location.pathname
        if (pathname !== pathname.toLowerCase()) {
            router.push(pathname.toLowerCase())
        }
    },[])

    return ""
}