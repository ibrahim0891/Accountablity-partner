

const Heading = ({text , className=''}) => {
    return <h2 className={"text-xl font-semibold tracking-tight text-my-green-900 mb-4 " + className }> {text} </h2>
}

export default Heading