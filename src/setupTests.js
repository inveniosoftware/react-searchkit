// IMPORTANT: this files should be imported first to apply some global variables
import "./polyfill.js";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

configure({ adapter: new Adapter() });
