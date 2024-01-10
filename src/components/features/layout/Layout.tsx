import NavButtons from "./NavButtons"

const Layout = (props: { children: React.ReactNode }) => {

    return (
        <>
        <NavButtons />
        {props.children}
        </>
    )
}

export default Layout