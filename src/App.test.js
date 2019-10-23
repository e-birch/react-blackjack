import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("blackjack site", () => {
  let wrapper;
    beforeAll(() => {
      wrapper = mount( <App />); 
    });

  it("should have title 'Blackjack 2018'", () => {
    console.log(wrapper);

  });

});
