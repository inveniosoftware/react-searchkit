#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 CERN.
# SPDX-License-Identifier: MIT

# Usage:
#   ./run-js-tests.sh [args]

# Arguments
# -i|--install: installs dependencies
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

for arg in $@; do
	case ${arg} in
		-i|--install)
			npm ci;;
		*)
			printf "Argument ${RED}$arg${NC} not supported\n"
			exit 1;;
	esac
done

printf "${GREEN}Run tests${NC}\n"
CI=true npm test
