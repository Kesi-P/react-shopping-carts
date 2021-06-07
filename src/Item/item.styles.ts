
import styled from 'styled-components';
//@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap');
export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;    
    border-radius: 20px;
    height:100%;
    }
    @font-face {
        font-family: 'Noto Sans JP', sans-serif;
        font-style: normal;
        font-weight: 400;
        src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap');
      }
    button{
        font-family: 'Noto Sans JP', sans-serif;
        flex-grow: 1;
    }
    h4.title{
        font-family: 'Noto Sans JP', sans-serif;
        font-weight:normal
    }
    
    
`;

export const Productimage = styled.div`
        background-repeat: no-repeat;
        background-size: contain;
        height: 150px;
        background-position: center;

`