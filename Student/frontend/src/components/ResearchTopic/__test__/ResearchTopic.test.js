import React from 'react'; 
import ReactDOM from 'react-dom';
import ResearchTopic from './../researchTopic';
import { BrowserRouter } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import renderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <BrowserRouter>
     <ResearchTopic></ResearchTopic>
     </BrowserRouter>, div)
})

it("renders Research Topic correctly", () => {
    const {getByTestId} = render(<BrowserRouter><ResearchTopic><div><h1>"Selecting Topic"</h1></div></ResearchTopic></BrowserRouter>)
    expect(getByTestId('topic')).toHaveTextContent("Selecting Topic")
})

// This will convert this to like a virtual DOM object
it("matches snapshot", () =>{
    const tree= renderer.create(<BrowserRouter><ResearchTopic><div><h1>"DISPLAY Selecting Topic"</h1></div></ResearchTopic></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot(); 
     
} )