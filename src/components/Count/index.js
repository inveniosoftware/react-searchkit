/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '@app/store';
import CountComponent from './Count';

export const Count = connect(state => ({
  total: state.results.data.total,
  loading: state.results.loading,
}))(CountComponent);
