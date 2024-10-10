import { TextEncoder, TextDecoder, ReadableStream } from "util";

Object.assign(global, { TextDecoder, TextEncoder, ReadableStream });
