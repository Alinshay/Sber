import styled, { css } from 'styled-components'

const btn = (light, dark) => css`
                           white-space: nowrap;
display: inline-block;
border-radius: 5px;
padding: 5px 15px;
font-size: 16px;
color: white;
&:visited {
   color: white;
 }
background-image: linear-gradient(${light}, ${dark});
border: 1px solid ${dark};
&:hover {
   background-image: linear-gradient(${light}, ${dark});
&[disabled] {
   background-image: linear-gradient(${light}, ${dark});
 }
}
&:visited {
   color: black;
 }
&[disabled] {
   opacity: 0.6;
   cursor: not-allowed;
 }
`

const btnDefault = css`
                   ${btn('#ff9600', '#ff9600')} 
`

const btnPrimary = btn('#52a031', '#52a160')

export default styled.div`
font-family: sans-serif;

h1 {
  text-align: center;
  color: #222;
}

h2 {
  text-align: center;
  color: #52a031;
}


& > div {
    text-align: center;
    display: block;
  }

a {
  display: block;
  text-align: center;
  color: #222;
}

form {
  max-width: 700px;
  margin: 10px auto;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;


& > div {
    display: grid;
    grid-template-columns: 18em 18em;
    margin: 15px;
    
& > span{
color red;
grid-column-start: 2;
}
& > label {
    text-align: right;
    color: #333;
    margin-right: 20px;
    font-size: 1em;
    line-height: 32px;
  }
& > input,
& > select,
& > textarea {
    padding: 3px 5px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

& > a{
margin-right: 0;}  
  
& > input[type='checkbox'] {
    margin-top: 7px;
  }
& > div {
    margin-left: 25px;
& > label {
    display: block;
& > input {
    margin-right: 3px;
  }
}
}
}
& > .buttons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-top: 15px;
  }
button {
  margin: 0 10px;
&[type='submit'] {
   ${btnPrimary};
 }
&[type='button'] {
   ${btnDefault};
 }
}
}
`
