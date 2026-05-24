/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

/**
 * Custom errors to raise specific expcetions
 */

export function RequestCancelledError() {}

RequestCancelledError.prototype = new Error();
