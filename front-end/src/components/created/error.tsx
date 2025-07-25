import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className="w-[60%]" />
}

function ErrorVisi() {
    return (
        <div className="w-full bg-sky-900 flex justify-center">
            <h2 className="w-50 font-bold text-white flex text-center">
                Sinto muito... <br/> Parece que nosso sistema está instável, tente novamente mais tarde.
            </h2>
        </div>
    )
}

export default ErrorVisi;
