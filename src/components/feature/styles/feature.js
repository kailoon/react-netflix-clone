import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 165px 45px;
`
export const Title = styled.h1`
    color: white;
    font-size: 60px;
    max-width: 640px;
    font-weight: 500;
    margin: auto;

    @media (max-width: 600px) {
        font-size: 35px;
    }
`
export const SubTitle = styled.h2`
    color: white;
    font-size: 26px;
    font-weight: normal;
    margin: 16px auto;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`
