import React from 'react'; 
import ReactDOM from 'react-dom';
import staffProfile from './../staffProfile';
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import renderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
     <staffProfile></staffProfile>
     </BrowserRouter>, div)
})

// it("renders Staff Profile correctly", () => {
//     const {getByTestId} = render(<BrowserRouter><staffProfile><div><div>"Id Number"</div></div></staffProfile></BrowserRouter>)
//     expect(getByTestId('profile')).toHaveTextContent("Id Number")
// })

// This will convert this to like a virtual DOM object
it("matches snapshot", () =>{
    const tree= renderer.create(<BrowserRouter><staffProfile><div></div></staffProfile></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot(); 
     
} )