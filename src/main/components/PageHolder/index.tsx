import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "src/main/bll/routes/routes"
import { Home } from "src/pages"
import styled from "styled-components/macro"


export const PageHolder = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.pageNotFound} element={<h1>Page not found</h1>} />
                <Route path={"/*"} element={<Navigate to={routes.pageNotFound} />} />
            </Routes>
        </Wrapper>
    ) 
}

const Wrapper = styled.div`
    height: 100%;
`