import React from 'react'; 
import ReactDOM from 'react-dom';
import Cards from './../Cards';
import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import renderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
     <Cards></Cards>
     </BrowserRouter>, div)
})

it("renders Cards correctly", () => {
    const {getByTestId} = render(<BrowserRouter><Cards><div><h1>"DASHBOARD"</h1></div></Cards></BrowserRouter>)
    expect(getByTestId('cards')).toHaveTextContent("DASHBOARD")
})

// it("renders Cards correctly", () => {
//     const {getByTestId} = render(<BrowserRouter><Cards><div><h1>"DISPLAY DASHBOARD"</h1></div></Cards></BrowserRouter>)
//     expect(getByTestId('cards')).toHaveTextContent("DASHBOARD")
// })

//This will convert this to like a virtual DOM object
it("matches snapshot", () =>{
    const tree= renderer.create(<BrowserRouter><Cards><div><h1>"DISPLAY DASHBOARD"</h1></div></Cards></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot(); 
    //It looks for folder called snapshot
} )