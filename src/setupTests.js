// IMPORTANT: this files should be imported first to apply some global variables
import "./polyfill.js";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
