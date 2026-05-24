/*
 * SPDX-FileCopyrightText: 2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { TextEncoder, TextDecoder, ReadableStream } from "util";

Object.assign(global, { TextDecoder, TextEncoder, ReadableStream });
