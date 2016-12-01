import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

const mockUrls = [{title: 'Google', url: 'https://www.google.com', id: 1, unix: 1, counter: 2}, {title: 'ESPN', url: 'https://www.espn.com', id: 2, unix:2, counter:1}]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('contains two inputs and a button on render', () => {
    expect(shallow(<App />).find('.title-input').length).toBe(1);
    expect(shallow(<App />).find('.url-input').length).toBe(1);
    expect(shallow(<App />).find('.url-submit-button').length).toBe(1);
});

it.skip('its button is disabled if nothing is in the inputs', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('.url-submit-button')).to.have.property('disabled');
})

it('renders the urls it adds to its state', () => {
  const wrapper = mount(<App />);
  wrapper.setState({ urls: mockUrls })
  expect(wrapper.find('.url-item').length).toBe(2)
})

it('sorts the urls by time', () => {
  const wrapper = mount(<App />);
  wrapper.setState({ urls: mockUrls })
  wrapper.find('.sort-by-click').simulate('click')
  wrapper.find('.url-item').at(0).props('counter').to.equal(2)
})
// expect(wrapper.find(Foo).at(0).props().foo).to.equal("bar")

// const wrapper = mount(<Foo />);
// expect(wrapper.find('.foo')).to.have.length(1);
// expect(wrapper.find('.bar')).to.have.length(0);
// wrapper.setState({ name: 'bar' });
// expect(wrapper.find('.foo')).to.have.length(0);
// expect(wrapper.find('.bar')).to.have.length(1);
