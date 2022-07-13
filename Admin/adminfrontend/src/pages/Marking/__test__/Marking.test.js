import React from 'react'; 
import ReactDOM from 'react-dom';
import CreateMarking from './../CreateMarking';
import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import renderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
     <CreateMarking></CreateMarking>
     </BrowserRouter>, div)
})

it("renders Create Marking correctly", () => {
    const {getByTestId} = render(<BrowserRouter><CreateMarking><div><h2>"Create New Marking Scheme"</h2></div></CreateMarking></BrowserRouter>)
    expect(getByTestId('marking')).toHaveTextContent("Create New Marking Scheme")
})

// it("renders Create Marking correctly", () => {
//     const {getByTestId} = render(<BrowserRouter><CreateMarking><div><h2>"DISPLAY Create New Marking Scheme"</h2></div></CreateMarking></BrowserRouter>)
//     expect(getByTestId('marking')).toHaveTextContent("Create New Marking Scheme")
// })

// //This will convert this to like a virtual DOM object
it("matches snapshot", () =>{
    const tree= renderer.create(<BrowserRouter><CreateMarking><div><form><label>"ID"</label></form></div></CreateMarking></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot(); 
    //It looks for folder called snapshot
} )